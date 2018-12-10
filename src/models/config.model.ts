/**
 * Interface used to model the current configuration.
 * This gets injected using a Context instance.
 *
 * In the future, this should be connected to
 * some visual interface to make this a user friendly tool
 * but for now a JSON file will suffice.
 */
export interface Config {
  // how many clients can be on a given adapter
  // when testing it. A negative value represents "any", and
  // 0 actually represents 0 clients.
  maxClientsForTest: number
  testPeriod: number // how many seconds between each test
  adapter: string // default to "actiontec-t3200m"
  testServices: string[] // default to ["fast", "ookla"]
  serviceSpec: string // default to "telus-victoria-75"
  reporters: string[] // default to ["firebase"]
  nTestSamples: number // number of required samples when testing

  reportFilename?: string

  sheetsDocKey?: string

  sheetsCredPath?: string

  sheetsSheetName?: string
}
