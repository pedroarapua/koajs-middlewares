'use strict';
process.env["NODE_CONFIG_DIR"] = __dirname + "/../config";
const app = require('koa')(),
  config = require('config'),
  bodyParser = require('koa-bodyparser'),
  Boom = require('boom'),
  Router = require('koa-router'),
  pkg = require('../package.json'),
  newrelic = require('newrelic'),
  rp = require('request-promise'),
  _ = require('lodash'),
  { KoaBunyanLogger, 
    KoaHeaderResponseTime, 
    KoaParseSequelize, 
    KoaNewRelic,
    KoaError,
    KoaSentry } = require('../libs');


const bunyan = require('bunyan');
const logger = bunyan.createLogger({ 
  "name": pkg.name,
  "env": "development",
  "kind": "server",
  "team": "team",
  "version": pkg.version,
  "streams": _.cloneDeep(config.logs)
});

KoaSentry.init(app, config.sentry.url, {
  'environment': config.environment,
  'release': pkg.version,
  'autoBreadcrumbs': {
    'console': true,
    'http': true,
    'pg': true
  }
});

const router = new Router();
router.get('/', function * () {
  var options = {
    uri: 'http://ec2-34-238-40-130.compute-1.amazonaws.com:3000/app/v1/users/1',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true, 
    timeout: 5000,
    resolveWithFullResponse: true
  };

  let html = yield rp(options)
    .then(resp => KoaSentry.setContextApi('congrega-api', options, resp))
    .catch(err => KoaSentry.setContextApi('congrega-api', options, err))

  throw new Error('boba');

  this.body = { teste: 123 };
  this.status = 200;
});

app
  .use(bodyParser())
  .use(KoaHeaderResponseTime)
  .use(KoaNewRelic(newrelic))
  .use(KoaBunyanLogger(logger))
  .use(KoaSentry.errorHandler())
  .use(KoaError)
  .use(KoaSentry.errorOriginalHandler)
  .use(KoaParseSequelize)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001, '0.0.0.0', (err) => {
  if (err) throw err;

  console.log('Server is available on http://localhost:3001');
});