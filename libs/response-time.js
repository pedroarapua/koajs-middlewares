'use strict';
module.exports = function* (next) {
  const startDate = new Date();
  yield next;
  const ms = new Date() - startDate;
  this.set('X-Response-Time', `${ms}ms`);
};