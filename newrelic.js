'use strict';
/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
/**
 *  * New Relic agent configuration.
 *   *
 *    * See lib/config.defaults.js in the agent distribution for a more complete
 *     * description of configuration variables and their potential values.
 *      */
exports.config = {
  attributes: {
    enabled: true
  },
  agent_enabled: process.env['NEWRELIC_ENABLED'] == 'true' || false,
  app_name : ['koajs-middlewares'],
  license_key : process.env['NEWRELIC_ENABLED'] == 'true' ? process.env['NEWRELIC_LICENSE_KEY'] : '#key#',
  logging : {
    level : 'info',
    filepath: __dirname + '/logs/newrelic_agent.log'
  },
  error_collector: {
    ignore_status_codes: [404, 401, 400]
  }
};

