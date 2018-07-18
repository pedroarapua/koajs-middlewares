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
  capture_params: true,
  agent_enabled: false,
  /**
 *    * Array of application names.
 *       */
  app_name : ['koajs-middlewares'],
  /**
 *    * Your New Relic license key.
 *       */
  license_key : '#key#',
  logging : {
    level : 'info',
    filepath: './logs/newrelic_agent.log'
  },
  error_collector: {
    ignore_status_codes: []
  }
};

