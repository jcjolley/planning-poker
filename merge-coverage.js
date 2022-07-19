const mergeCoverage = require('@northfork/basics/merge-coverage')

const coverageJSONs = new Map([
  ['karma', './build/karma/coverage-final.json'],
  ['cypress', './build/cypress-coverage/coverage-final.json'],
])

mergeCoverage(coverageJSONs)
