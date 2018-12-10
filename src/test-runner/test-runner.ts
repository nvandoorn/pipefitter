// Data models (interfaces)
import { Config } from '../models/config.model'
import { Adapter } from '../models/adapter.model'
import { TestService } from '../models/test-service.model'
import { Reporter } from '../models/reporter.model'
import { Report } from '../models/report.model'
import { Context } from '../models/context.model'
import { ExecState } from '../models/exec-state.model'
import { ReportStat } from '../models/report-stat.model'

// Physical hardware adapters (a standard Telus one for now)
import { ActiontecT3200M } from '../adapters/actiontec-t3200m'

// Test providers
import { Ookla } from '../test-services/ookla'
import { Fast } from '../test-services/fast'

// Data reporters
import { Firebase } from '../reporters/firebase'
import { Sheets } from '../reporters/sheets'
import { File } from '../reporters/file'

import { Scheduler } from '../scheduler'

const adapterMap = {
  'actiontec-t3200m': ActiontecT3200M
}

const testServiceMap = {
  ookla: Ookla,
  fast: Fast
}

const reportersMap = {
  firebase: Firebase,
  sheets: Sheets,
  file: File
}

const now = () => Date.now() / 1000

const mapToObj = (keys: string[], mapObj: Object) =>
  keys.map(k => mapObj[k]).filter(k => k != null)

export const testRunner = async (ctx: Context) => {
  const { config } = ctx
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

  const adapterClass = adapterMap[config.adapter]
  // only 'new' it if we found an adapter in the map
  const adapter = adapterClass ? new adapterClass(ctx) : undefined
  const services = makeTestServices(config.testServices)
  const scheduler = new Scheduler(ctx, adapter)

  const testCallback = async (e: ExecState) => {
    const reporters = makeReporters(config.reporters)
    const reports = await testEachService(adapter, services, ctx)
    reportEach(reporters, reports, ctx)
  }
  scheduler.subscribe(testCallback)
}

export const reportEach = async (
  reporters: Reporter[],
  report: Report,
  ctx: Context
): Promise<void> => {
  for (let reporter of reporters) {
    try {
      ctx.logger(`Reporting results to ${reporter.name}`)
      reporter.record(report)
      await reporter.publish()
    } catch (err) {
      ctx.logger('shit')
      ctx.logger(err)
    }
  }
}

export const testEachService = async (
  adapter: Adapter,
  services: TestService[],
  ctx: Context
): Promise<Report> => {
  const isOnline = await adapter.isOnline()
  const nConnectedClients = await adapter.nConnectedClients()
  const leaseTime = await adapter.leaseTime()
  const uptime = await adapter.uptime()
  const tests = []
  for (let service of services) {
    ctx.logger(`Testing ${service.name}`)
    const stats: ReportStat[] = [await testService(service, ctx)]
    tests.push({ stats, testServiceName: service.name })
  }
  return {
    nConnectedClients,
    leaseTime,
    uptime,
    tests,
    adapterName: adapter.name,
    datetime: now()
  }
}

export const testService = async (
  service: TestService,
  ctx: Context
): Promise<ReportStat> => {
  const download = await service.testDownload()
  const upload = await service.testUpload()
  return {
    download,
    upload,
    datetime: now()
  }
}
