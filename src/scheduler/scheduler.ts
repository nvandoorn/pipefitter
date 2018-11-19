import os from 'os'
import { Context } from '../models/context.model'
import { Adapter } from '../models/adapter.model'
import { ExecState } from '../models/exec-state.model'

export type SubscribeCallback = (e: ExecState) => Promise<any>

const getExecState = (): ExecState => ({
  cpuUsage: os.cpus(),
  freeMem: os.freemem(),
  systemUptime: os.updatime()
})

export class Scheduler {
  // array of callbacks to execute
  private subscriptions: SubscribeCallback[] = []
  // object returned from setTimeout
  private timer
  // scheduling _can_ depend on the state
  // of the adapter so we need to inject it
  constructor(private ctx: Context, private adapter?: Adapter) {}

  public subscribe(callback: SubscribeCallback): void {
    this.subscriptions.push(callback)
    if (this.subscriptions.length <= 1) {
      const timerCallback = () => {
        for (let callback of this.subscriptions) {
          callback(getExecState())
        }
        this.timer = setTimeout(
          timerCallback,
          this.ctx.config.testPeriod * 1000
        )
      }
      timerCallback()
    }
  }

  public unsubscribe(): void {
    this.subscriptions = []
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
