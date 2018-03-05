PROJECT=pihole
NAME ?= $(shell node -e "console.log(require('./package.json').name);")
VERSION ?= $(shell node -e "console.log(require('./package.json').version);")
BUILDNR ?=1

login:
	ssh pi@hole.local

build:
	docker build -f ./docker/Dockerfile -t pihole/client .

deploy:
	docker save pihole/client | bzip2 | ssh pi@hole.local 'bunzip2 | docker load'

restart:
	- ssh pi@hole.local 'docker stop client'
	- ssh pi@hole.local 'docker rm client'
	ssh pi@hole.local 'docker run \
	--name=client \
	--restart unless-stopped \
	-e NODE_ENV=production \
	-e IQO2_SQL_HOST=iq02-master-aurora-cluster.cluster-cw1srjgtiiay.eu-west-1.rds.amazonaws.com \
	-p 3000:3000 \
	-d pihole/client'

run:
	docker run --name=pihole -p 3000:3000 -d pihole/client

provision:
	make build
	make deploy
	make restart
	make login
