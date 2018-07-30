'use strict';
const Boom = require('boom');
const jwt = require('jsonwebtoken')

module.exports = function ({ secret }) {
  return function* (next) {
    if (!this.header || !this.header.authorization) {
      throw Boom.unauthorized('No token provided.');
    }

    const parts = this.header.authorization.split(' ');
    let token;
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }

    try {
      jwt.verify(token, secret);
    } catch(err) {
      throw Boom.unauthorized('Token is invalid');
    }
    yield next;
  }
};