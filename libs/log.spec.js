const sinon = require('sinon')

const { app, logger } = require('../examples')
const request = require('supertest').agent(app.listen())

const sandbox = sinon.createSandbox()

describe('logging', () => {
  describe('send log', () => {
    it('successfully sends log', (done) => {
      const spyLogger = sinon.spy(logger, 'info')
      request
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) throw err

          sandbox.assert.calledOnce(spyLogger)
          done()
        })
    })
  })
})
