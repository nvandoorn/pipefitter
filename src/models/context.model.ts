import { Config } from './config.model'

/**
 * Context interface used to model
 * depdencies injected into each module.
 * Small for now but I suspect this will grow
 */
export interface Context {
  isTestMode: boolean
  config: Config
  logger: (r: Error | string | any) => void
}
