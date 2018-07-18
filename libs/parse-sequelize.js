'use strict'
const _ = require('lodash')

function parseSequelize (array) {
  var that = this
  var arrayResponse = []
  var newArray = Array.isArray(array) ? array : [array]

  _.each(newArray, function (obj, index) {
    var objAux
    if (obj.dataValues) {
      objAux = obj.dataValues // This must be an INSERT...so dig deeper into the JSON object
    } else {
      objAux = obj // This is a find...so the JSON exists here
    }

    var keys = Object.keys(objAux)
    _.each(keys, function (key) {
      if (_.isObject(objAux[key]) && !_.isDate(objAux[key])) {
        objAux[key] = that.parseSequelize(objAux[key])
      }
    })

    arrayResponse[index] = objAux
  })

  if (!array.length) {
    return arrayResponse[0]
  } else {
    return arrayResponse
  }
}

module.exports = async (ctx, next) => {
  await next()

  if (ctx.body) {
    ctx.body = parseSequelize(ctx.body)
  }
}
