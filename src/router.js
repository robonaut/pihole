const Router = require('koa-router');
const config = require('./config');
const api = require('./api');

const router = new Router({
  prefix: config.apiPath,
});

router.get('/', async (ctx, next) => {
  ctx.body = api.wifiConnections;
});

module.exports = router;
