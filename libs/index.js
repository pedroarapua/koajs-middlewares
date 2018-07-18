const KoaBunyanLogger = require('./log');
const KoaHeaderResponseTime = require('./response-time');
const KoaParseSequelize = require('./parse-sequelize');
const KoaNewRelic = require('./newrelic');

module.exports = {
  KoaBunyanLogger,
  KoaHeaderResponseTime,
  KoaParseSequelize,
  KoaNewRelic
};