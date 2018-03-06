const zmq = require('zmq');
const { io, driver } = require('matrix-protos').matrix_io.malos.v1;

class Leds {

	static get NumberOfLeds() {
		return 35;
	}

	static get Off() {
		return {
			red: 0,
			green: 0,
			blue: 0,
			white: 0,
		};
	}

	constructor(config = {}) {
		this.matrixIp = config.matrixIp || '127.0.0.1';
		this.matrixPort = config.matrixPort || 20021;
		this.configSocket = zmq.socket('push');
		this.errorSocket = zmq.socket('sub');
	}

	wait(duration = 0) {
		return new Promise(res => setTimeout(res, duration));
	}

	connect() {
		this.configSocket.connect(`tcp://${this.matrixIp}:${this.matrixPort}`);
		this.errorSocket.connect(`tcp://${this.matrixIp}:${this.matrixPort + 2}`);
		this.errorSocket.on('message', errorMessage => {
			console.log('Message received: Matrix error: ' + errorMessage.toString('utf8'));
		});
		this.configSocket.on('message', console.log);
	}

	disconnect() {
		this.configSocket.close();
		this.errorSocket.close();
	}

	changeColor(color = {}, index = -1) {
		const image = new io.EverloopImage();
		const config = new driver.DriverConfig({ image });
		const ledValue = new io.LedValue(color);
		for (var j = 0; j < Leds.NumberOfLeds; ++j) {
			if (index < 0 || index % Leds.NumberOfLeds === j) {
				image.led.push(ledValue);
			} else {
				image.led.push(Leds.Off);
			}
		}
		const driverMessage = driver.DriverConfig.encode(config).finish();
		this.configSocket.send(driverMessage);
	}

	async pulseColor({ color = {}, duration = 200 }) {
		let pulse = [];
		for (let i = 0; i < duration; i++) {
			const pulseColor = {
				red: color.red ? (i / duration) * color.red : 0,
				green: color.green ? (i / duration) * color.green : 0,
				blue: color.blue ? (i / duration) * color.blue : 0,
				white: color.white ? (i / duration) * color.white : 0,
			};
			pulse.push(pulseColor);
		}
		pulse.push(color);
		pulse = pulse.concat(pulse.slice(0, -1).reverse());
		for (let pulseColor of pulse) {
			this.changeColor(pulseColor);
			await this.wait();
		}
	}

	async pulseRepeatColor({ color = {}, pulseDuration = 200, intervalDuration = 100, repetitions = 3 }) {
		for (let i = 0; i < repetitions; i++) {
			await this.pulseColor({ color, duration: pulseDuration });
			await this.wait(intervalDuration);
		}
	}

	async flashColor({ color = {}, duration = 100 }) {
		this.changeColor(color);
		await this.wait(duration);
		this.changeColor(Leds.Off);
		return {};
	}

	async flashRepeatColor({ color = {}, flashDuration = 100, intervalDuration = 100, repetitions = 3 }) {
		for (let i = 0; i < repetitions; i++) {
			await this.flashColor({ color, duration: flashDuration });
			await this.wait(intervalDuration);
		}
	}

	async circleColor({ color = {}, rotationsPerSecond = 2, repetitions = 3 }) {
		for (let i = 0; i < repetitions; i++) {
			for (let j = 0; j < Leds.NumberOfLeds; j++) {
				this.changeColor(color, j);
				const waitTime = 1000 / rotationsPerSecond / Leds.NumberOfLeds;
				await this.wait(waitTime);
			}
		}
	}

}

module.exports = Leds;
