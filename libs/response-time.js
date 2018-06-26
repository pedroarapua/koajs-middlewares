module.exports = async (ctx, next) => {
  const startDate = new Date()

  await next()

  const ms = new Date() - startDate

  ctx.set('X-Response-Time', `${ms}ms`)
}
