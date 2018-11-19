/**
 * Interface to model specific state of the execution
 * enviornment when a test is being scheduled. Most
 * of this will be centered around the test hardware itself.
 *
 * This interface is usually used in Scheduler.subscribe call.
 *
 * Things that come to mind are CPU usage and other "meta" stats we may
 * want.
 */
export interface ExecState {
  systemUptime: number // seconds
  cpuUsage: number // percent
  freeMem: number
}
