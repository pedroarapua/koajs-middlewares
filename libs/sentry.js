'use strict';
const Boom = require('boom');
const Raven = require('raven');
const pick = require('lodash/pick');

module.exports = {
  init: (app, url, options) => {
    Raven.config(url, options).install();

    app.on('error', function(err){
      sentry.Raven.captureException(err);
    });
  },
  setContextApi: (api = 'call api', request, response) => {
    const isError = response instanceof Error;
    let log = {
      message: api,
      data: {
        request: request,
        response: !isError ? pick(response, 'headers', 'body', 'statusCode') : undefined,
        error: isError ? pick(response, 'message', 'stack', 'name') : undefined
      }
    };
  
    Raven.captureBreadcrumb(log);
  },
  errorHandler: (array = [500, 501, 502, 503, 504]) => {
    return function* (next) {
      Raven.context(() => {

      });
      let error;
      let statusCode;
      try {
        yield next;
        statusCode = this.status;
        error = this._sentryError;
      }
      catch(err) {
        error = err;
        statusCode = 500;
      }

      if(array.indexOf(statusCode) > -1) {
        Raven.captureException(error, { req: this.request });
      }
    };
  }
};