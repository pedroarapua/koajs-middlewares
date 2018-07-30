'use strict';
const dotenv = require('dotenv');
dotenv.config({path: __dirname + "/../.env"});

module.exports = {
  'environment': process.env['NODE_ENV'] || 'development',
  // config
  'application': {
    'host': '0.0.0.0',
    'port': process.env['PORT'] || 3000
  },
  'sentry': {
    'enabled': process.env['SENTRY_ENABLED'] ? process.env['SENTRY_ENABLED'] == 'true' : false,
    'url': (process.env['SENTRY_ENABLED'] && process.env['SENTRY_ENABLED'] == 'true') ? process.env['SENTRY_URL'] : undefined
  },
  'logs': [
    {
      'level': 'trace',
      'type': 'rotating-file',
      'path': __dirname + '/../logs/koajs-middlewares-bunyan.log',
      'period': '1d',
      'count': 7
    }
  ]
};
