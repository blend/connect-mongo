'use strict'

const legacyTests = require('./legacy-tests')

// Catch-all for unhandled promise rejections
process.on('unhandledRejection', (reason, err) => {
  console.error('Caught unhandled rejection!')
  console.error(`Reason: ${reason}`)
  console.error(err)
  process.exit(1)
})

describe('Legacy tests', function () {
  const tests = Object.keys(legacyTests)

  const setupName = 'test_setup'
  const tearDownName = 'test_tear_down'

  const setup = legacyTests[setupName]
  const tearDown = legacyTests[tearDownName]

  if (setup) before('setup legacy tests', setup)
  this.timeout(6000)
  tests.forEach(testName => {
    if (testName == setupName || testName == tearDownName) {
      return
    }
    it(testName, legacyTests[testName])
  })
  if (tearDown) after('tear down legacy tests', tearDown)
})
