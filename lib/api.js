const config = require('../config');
const Leds = require('./leds');
const colors = require('./colors');

class API {

	constructor() {
		this.initializeLeds();
	}

	initializeLeds() {
		this.leds = new Leds({ matrixIp: config.matrixIp });
		this.leds.connect();
		this.leds.pulseRepeatColor({
			color: colors.wakeUp,
			pulseDuration: 200,
			intervalDuration: 100,
			repetions: 3,
		});
	}

}

module.exports = API;
