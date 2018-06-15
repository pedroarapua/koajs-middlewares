'use strict';
module.exports = function (bunyanLogger) {
  return function * (next) {
    const startDate = new Date();
    let error;
    
    yield next;
    
    const endDate = new Date();
    const latency = parseFloat(parseFloat((endDate - startDate) / 1000).toFixed(3));
    let log = {
      "http.lantency_seconds": latency,
      "path": this.path,
      "http.request_body": typeof(this.request.body) === 'string' ? this.request.body : JSON.stringify(this.request.body),
      "http.request_header": JSON.stringify(this.request.headers),
      "http.request_method": this.request.method,
      "http.response_body": typeof(this.response.body) === 'string' ? this.response.body : JSON.stringify(this.response.body),
      "http.response_header": JSON.stringify(this.response.headers),
      "http.request_size": 1,
      "http.status_code": this.response.status,
      "http.url": this.request.href,
      'type': 'json'
    };
    
    bunyanLogger.info(log);
  };
};