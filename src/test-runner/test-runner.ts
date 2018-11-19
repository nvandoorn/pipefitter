// Data models (interfaces)
import { Config } from '../models/config.model'
import { Adapter } from '../models/adapter.model'
import { TestService } from '../models/test-service.model'
import { Reporter } from '../models/reporter.model'
import { Context } from '../models/context.model'

// Physical hardware adapters (a standard Telus one for now)
import { ActiontecTS3200M } from '../adapters/actiontec-t3200m'

// Test providers
import { Ookla } from '../test-services/ookla'
import { Fast } from '../test-services/fast'

// Data reporters
import { Firebase } from '../reporters/firebase'

const adapterMap = {
  'actiontec-ts3200m': ActiontecTS3200M
}

const testServiceMap = {
  ookla: Ookla,
  fast: Fast
}

const reportersMap = {
  firebase: Firebase
}

const mapToObj = (keys: string[], mapObj: Object) =>
  keys.map(k => mapObj[k]).filter(k => k != null)

export const testRunner = (ctx: Context) => {
  // Users configure which adapters/services/reporters
  // they want to use in Context.config. These "plugins"
  // are configured using strings, so we use "map" objects
  // to map a string to a class, and then create an instance
  // of each class with our current Context object
  const newWithCtx = k => new k(ctx)

  const makeTestServices = (testProviders: string[]): TestService[] =>
    mapToObj(testProviders, testServiceMap).map(newWithCtx)

  const makeReporters = (reporters: string[]): Reporter[] =>
    mapToObj(reporters, reportersMap).map(newWithCtx)

  const adapterClass = adapterMap[ctx.config.adapter]
}
