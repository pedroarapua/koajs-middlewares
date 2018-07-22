const KoaBunyanLogger = require('./log');
const KoaHeaderResponseTime = require('./response-time');
const KoaParseSequelize = require('./parse-sequelize');
const KoaNewRelic = require('./newrelic');
const KoaSentry = require('./sentry');
const KoaError = require('./error');

module.exports = {
  KoaBunyanLogger,
  KoaHeaderResponseTime,
  KoaParseSequelize,
  KoaNewRelic,
  KoaSentry,
  KoaError
};