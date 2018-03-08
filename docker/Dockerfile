FROM arm32v7/debian:stretch-slim
#FROM debian:stretch-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
	sudo \
	ca-certificates \
	findutils \
	gnupg \
	dirmngr \
	inetutils-ping \
	iproute \
	netbase \
	curl \
	make \
	g++ \
	udev \
	vim \
	&& rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y --no-install-recommends \
	systemd \
	systemd-sysv \
	&& rm -rf /var/lib/apt/lists/*

# We never want these to run in a container
RUN systemctl mask \
	dev-hugepages.mount \
	sys-fs-fuse-connections.mount \
	sys-kernel-config.mount \
	display-manager.service \
	getty@.service \
	systemd-logind.service \
	systemd-remount-fs.service \
	getty.target \
	graphical.target \
	kmod-static-nodes.service

RUN apt-get update && apt-get install -y --no-install-recommends \
	alsa-utils \
	libatlas-base-dev \
	libmagic-dev \
	libzmq3-dev \
	python-pyaudio \
	python3-pyaudio \
	sox && \
	curl -O https://bootstrap.pypa.io/get-pip.py && \
	python get-pip.py && \
	pip install pyaudio && \
	apt-get autoremove && \
	apt-get clean && \
	apt-get autoclean && \
	rm get-pip.py


RUN echo 'Install node.js 8' && \
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && \
	apt-get install -y nodejs

COPY package.json package.json
RUN npm install --production

COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

COPY docker/asound.conf /etc/asound.conf
COPY lib/ lib/
COPY *.js ./

EXPOSE 3000
CMD ["node", "server.js" ]
ENTRYPOINT ["/app/entrypoint.sh"]
