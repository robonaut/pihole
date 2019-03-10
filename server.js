// Koa app
const Koa = require('koa');
const Boom = require('boom');
const compress = require('koa-compress');
const config = require('./src/config');
const router = require('./src/router');
const app = (module.exports = new Koa());

// Compression
app.use(
  compress({
    threshold: 2048,
  })
);

// Response time
app.use(require('koa-response-time')());

// Parse request body
app.use(
  require('koa-bodyparser')({
    onerror: function(err, ctx) {
      ctx.throw('body parse error', 422);
    },
  })
);

// Routes
app.use(router.routes());
app.use(
  router.allowedMethods({
    throw: true,
    notImplemented: () => Boom.notImplemented(),
    methodNotAllowed: () => Boom.methodNotAllowed(),
  })
);

app.listen(config.apiPortInternal);

console.log('Server listening on port', config.apiPortInternal);
