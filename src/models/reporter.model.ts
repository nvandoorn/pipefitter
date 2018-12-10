import { Report } from './report.model'
import { Context } from './context.model'

/**
 * Reporter interface models a module used to report
 * results. Out of the box Firebase realtime database
 * will be supported
 */
export interface Reporter {
  name: string
  // record a single Report into a local
  // buffer
  record(r: Report): void
  // publish the current buffer and
  // report the success
  publish(): Promise<void>
}
