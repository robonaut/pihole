const Leds = require('../lib/leds');
const leds = new Leds();

const session = async () => {
	leds.connect();
	await leds.pulseRepeatColor({
		color: { red: 0, green: 20, blue: 10, white: 0 },
		pulseDuration: 200,
		intervalDuration: 100,
		repetions: 3,
	});
	// await leds.flashRepeatColor({
	// 	color: { red: 0, green: 10, blue: 200, white: 0 },
	// 	flashDuration: 500,
	// 	intervalDuration: 100,
	// 	repetions: 3,
	// });
	// await leds.flashColor({
	// 	color: { red: 10, green: 0, blue: 0, white: 0 },
	// 	duration: 50,
	// });
	// await leds.flashColor({
	// 	color: { red: 10, green: 20, blue: 0, white: 0 },
	// 	duration: 50,
	// });
	// await leds.flashColor({
	// 	color: { red: 10, green: 20, blue: 30, white: 0 },
	// 	duration: 50,
	// });
	// await leds.flashColor({
	// 	color: { red: 10, green: 20, blue: 30, white: 40 },
	// 	duration: 50,
	// });
	// await leds.flashColor({
	// 	color: { red: 10, green: 20, blue: 30, white: 50 },
	// 	duration: 50,
	// });
	// await leds.circleColor({
	// 	color: { red: 0, green: 255, blue: 10, white: 0 },
	// 	repetitions: 5,
	// });

	leds.disconnect();
};

session();
