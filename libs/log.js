module.exports = (bunyanLogger) => {
  return async (ctx, next) => {
    const startDate = new Date()

    await next()

    const endDate = new Date()
    const latency = parseFloat(parseFloat((endDate - startDate) / 1000).toFixed(3))
    const log = {
      'http.lantency_seconds': latency,
      'path': ctx.path,
      'http.request_body': typeof (ctx.request.body) === 'string' ? ctx.request.body : JSON.stringify(ctx.request.body),
      'http.request_header': JSON.stringify(ctx.request.headers),
      'http.request_method': ctx.request.method,
      'http.response_body': typeof (ctx.response.body) === 'string' ? ctx.response.body : JSON.stringify(ctx.response.body),
      'http.response_header': JSON.stringify(ctx.response.headers),
      'http.request_size': 1,
      'http.status_code': ctx.response.status,
      'http.url': ctx.request.href,
      'type': 'json'
    }

    bunyanLogger.info(log)
  }
}
