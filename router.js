const Router = require('koa-router');
const config = require('./config');
const API    = require('./lib/api');

const api = new API(config);
const router = new Router({
	prefix: config.apiPath,
});

router.get('/', async (ctx, next) => {
	ctx.body = { status: 'ok' };
});

module.exports = router;
