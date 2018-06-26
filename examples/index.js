const path = require('path')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const pkg = require('../package.json')
const { KoaBunyanLogger, KoaHeaderResponseTime } = require('../')

const Koa = require('koa')
const app = new Koa()

const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  'name': pkg.name,
  'env': 'development',
  'kind': 'server',
  'team': 'team',
  'version': pkg.version,
  'streams': [
    {
      'level': 'trace',
      'type': 'rotating-file',
      'path': path.join(__dirname, '/../logs/koajs-middlewares-bunyan.log'),
      'period': '1d',
      'count': 7
    },
    {
      level: 'info',
      stream: process.stdout // log INFO and above to stdout
    }
  ]
})

const router = new Router()
router.get('/', async (ctx) => {
  ctx.body = { teste: 123 }
  ctx.status = 200
})

app
  .use(bodyParser())
  .use(KoaBunyanLogger(logger))
  .use(KoaHeaderResponseTime)
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001, '0.0.0.0', (err) => {
  if (err) throw err

  console.log('Server is available on http://localhost:3001')
})
