import fs from 'fs'
import process from 'process'
import { Config } from '../src/models/config.model'
import { Context } from '../src/models/context.model'
import { testRunner } from '../src/test-runner'

const config: Config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`))
const ctx: Context = {
  isTestMode: process.env.NODE_ENV === 'production',
  logger: console.log,
  config
}
testRunner(ctx)
