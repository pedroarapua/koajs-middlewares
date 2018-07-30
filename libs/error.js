'use strict';
const Boom = require('boom');
const _ = require('lodash');

module.exports = function *(next){
  try {
    yield next;
    
    if(this.status == 404) {
      this.throw(404);  
    }
  } catch (err) {
    this.status = err.isJoi ? 400 : err.isBoom ? err.output.statusCode : (err.status || 500);
    this.body = err.isBoom ? err.output.payload : Boom.boomify(err, { statusCode: this.status }).output.payload;
    if(err.isJoi) {
      this.body.data = _.map(Array.isArray(err.details) ? err.details : [err.details], function(obj) {
        return _.pick(obj, 'message', 'path');
      });
    }
  }
};
