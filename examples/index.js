'use strict';
const app = require('koa')(),
  bodyParser = require('koa-bodyparser'),
  Router = require('koa-router'),
  pkg = require('../package.json'),
  _ = require('lodash'),
  { KoaBunyanLogger, KoaHeaderResponseTime, KoaParseSequelize } = require('../libs');


const bunyan = require('bunyan');
const logger = bunyan.createLogger({ 
  "name": pkg.name,
  "env": "development",
  "kind": "server",
  "team": "team",
  "version": pkg.version,
  "streams": [
    {
      'level': 'trace',
      'type': 'rotating-file',
      'path': __dirname + '/../logs/koajs-middlewares-bunyan.log',
      'period': '1d',
      'count': 7
    },
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    }
  ]
});

const router = new Router();
router.get('/', function * () {
  this.body = { teste: 123 };
  this.status = 200;
});

app
  .use(bodyParser())
  .use(KoaBunyanLogger(logger))
  .use(KoaHeaderResponseTime)
  .use(KoaParseSequelize)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001, '0.0.0.0', (err) => {
  if (err) throw err;

  console.log('Server is available on http://localhost:3001');
});