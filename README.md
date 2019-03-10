# Project Pihole

### Prerequisites
	- Raspberry Pi 3 B
	- Internet connection 😎

### Install Raspbian strech
	- Flash Raspian stretch lite onto SD card using Etcher
	- Enable ssh `$ touch /Volumes/boot/ssh`
	- Boot Pi with network access
  - ssh to Pi using default password (raspberry) `$ ssh pi@raspberrypi.local`
  - Copy ssh key (optional) `ssh-copy-id pi@raspberrypi.local`

### Install Docker
```sh
$ ssh pi@hole.local
$ sudo curl -sSL https://get.docker.com | sh
$ sudo usermod -aG docker pi
```

#Install Home Assistant and dependencies
https://nealde.github.io/blog/2017/10/26/how-to-install-hassio-and-pihole/
```
$ sudo apt install jq apparmor-utils socat
$ sudo curl -sL https://raw.githubusercontent.com/home-assistant/hassio-build/master/install/hassio_install | sudo bash -s -- -m raspberrypi3
```

### Provision docker container on raspberry with linked sound device
```sh
$ make provision
```
