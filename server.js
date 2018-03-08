// Koa app
const Koa      = require('koa');
const compress = require('koa-compress');
const config   = require('./config');
const app      = module.exports = new Koa();

// Response time
app.use(require('koa-response-time')());

// Parse request body
app.use(require('koa-bodyparser')({
	onerror: function (err, ctx) {
		ctx.throw('body parse error', 422);
	},
}));

// Routes
// app.use(router.routes());
// app.use(router.allowedMethods({
// 	throw: true,
// 	notImplemented: () => Boom.notImplemented(),
// 	methodNotAllowed: () => Boom.methodNotAllowed(),
// }));

app.listen(config.apiPortInternal);

console.log('Server listening on port', config.apiPortInternal);

// move this to separate class
const Leds = require('./lib/leds');
const leds = new Leds({ matrixIp: '172.17.0.1' });
leds.connect();
leds.pulseRepeatColor({
	color: { red: 20, green: 0, blue: 0, white: 0 },
	pulseDuration: 200,
	intervalDuration: 100,
	repetions: 3,
});
