import process from 'process'
import { Config, validateConfig } from '../src/models/config.model'
import { Context } from '../src/models/context.model'
import { testRunner } from '../src/test-runner'
;(async () => {
  const config: Config = require('./config.json')
  const errors = await validateConfig(config)
  const isValid = errors.length <= 0
  if (!isValid) {
    console.error('Invalid configuration:')
    for (let err of errors) {
      console.error(err)
    }
    process.exit(1)
  }
  const ctx: Context = {
    isTestMode: process.env.NODE_ENV !== 'production',
    logger: console.log,
    rootDir: __dirname,
    config
  }
  testRunner(ctx)
})()
