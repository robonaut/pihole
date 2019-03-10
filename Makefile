PROJECT=pihole/client
NAME ?= $(shell node -e "console.log(require('./package.json').name);")
VERSION ?= $(shell node -e "console.log(require('./package.json').version);")
BUILDNR ?=1
REPO ?= 112550259757.dkr.ecr.eu-west-1.amazonaws.com

login:
	ssh pi@hole.local

build:
	docker build -f ./docker/Dockerfile -t $(PROJECT) .

aws-login:
	$$(aws ecr get-login --no-include-email)

aws-push:
	docker tag $(PROJECT):latest $(REPO)/$(PROJECT):latest
	docker push $(REPO)/$(PROJECT):latest

aws-deploy:
	ssh pi@hole.local '$(shell aws ecr get-login --no-include-email)'
	ssh pi@hole.local 'docker pull $(REPO)/$(PROJECT):latest'

deploy:
	docker save $(PROJECT) | bzip2 | ssh pi@hole.local 'bunzip2 | docker load'

restart:
	- ssh pi@hole.local 'docker stop client'
	- ssh pi@hole.local 'docker rm client'
	- ssh pi@hole.local 'docker run \
	--name=client \
	--restart unless-stopped \
	-e NODE_ENV=production \
	-p 3000:3000 \
	-d $(REPO)/$(PROJECT):latest'

provision:
	make build
	make aws-push
	make aws-deploy
	make restart

update-lib:
	ssh pi@hole.local 'rm -r /tmp/lib'
	scp -r ./lib pi@hole.local:/tmp/lib
	ssh pi@hole.local 'docker cp /tmp/lib client:/app/'
	ssh pi@hole.local 'docker restart client'

getrecord:
	ssh pi@hole.local 'docker cp client:/app/test.wav .'
	scp pi@hole.local:~/test.wav .

record:
	ssh pi@hole.local 'docker exec client arecord -d 10 --device=mic_channel8 -r 16000 -c 1  -f S16_LE test.wav'
	make getrecord

recordsox:
	ssh pi@hole.local 'docker exec client sox -r 16000 -c 1 -e signed -c 1 -e signed -b 16 mic_16000_s16le_channel_8.raw test.wav'
	make getrecord

tunnel-leds:
	ssh -L 20021:localhost:20021 pi@hole.local
