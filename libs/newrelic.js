'use strict';
const util = require('util');

module.exports = function (newrelic) {
  return function* (next) {
    try {
      yield next;
    } catch (err) {
      newrelic.noticeError(err);
    } finally {
      try {
        if (this.mountPath) {
          let metricGroup = util.format('%s/%s ( %s )', this.mountPath.slice(1), this.matched[0].path.slice(1).split('?')[0], this.method);
          newrelic.setTransactionName(metricGroup);
        }
      } catch (err) {
        newrelic.noticeError(err);
      }
    }
  };
};