import * as v from 'class-validator'
/**
 * Interface used to model the current configuration.
 * This gets injected using a Context instance.
 *
 * In the future, this should be connected to
 * some visual interface to make this a user friendly tool
 * but for now a JSON file will suffice.
 */
export class Config {
  // how many clients can be on a given adapter
  // when testing it. A negative value represents "any", and
  // 0 actually represents 0 clients.
  @v.IsInt()
  maxClientsForTest: number

  @v.IsInt()
  testPeriod: number // how many seconds between each test

  @v.IsString()
  adapter: string // default to "actiontec-t3200m"

  @v.IsString()
  adapterUrl: string // TODO ?? Sane default

  @v.ArrayNotEmpty()
  testServices: string[] // default to ["fast", "ookla"]

  @v.IsOptional()
  @v.IsString()
  serviceSpec?: string // default to "telus-victoria-75"

  @v.ArrayNotEmpty()
  reporters: string[] // default to ["firebase"]

  @v.IsInt()
  nTestSamples: number // number of required samples when testing

  reportFilename?: string

  sheetsDocKey?: string

  sheetsCredPath?: string

  sheetsSheetName?: string
}

// TODO for some reason this doesn't work ;=;
export const validateConfig = (inst: Config) => v.validate(inst)
