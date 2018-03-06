# Project Pihole

### Prerequisites
	- Raspberry Pi 3 B
	- Matrix Voice microphone array

### Install Raspbian strech
	- Flash Raspian stretch onto SD card using Etcher
	- Enable SSH (docs)
	- Change pass
	- (optional) Install public key authorized keys

### Install Docker
```sh
$ ssh pi@hole.local
$ curl -sSL https://get.docker.com | sh
```

### Instal Matrix Voice driver on Raspbian stretch

```sh
$ ssh pi@hole.local
$ curl https://apt.matrix.one/doc/apt-key.gpg | sudo apt-key add -
$ echo "deb https://apt.matrix.one/raspbian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/matrixlabs.list
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install matrixio-malos
$ sudo reboot
```

### Provision docker container on raspberry with linked sound device
```sh
$ make provision
```

### Make record
```sh
$ make record
```

