import { Adapter } from '../../models/adapter.model'
import { Context } from '../../models/context.model'

export class ActiontecT3200M implements Adapter {
  name = 'ActiontecT3200M'
  constructor(private ctx: Context) {}
  isOnline = async (): Promise<boolean> => {
    return true
  }
  uptime = async (): Promise<number> => {
    return 5
  }
  nConnectedClients = async (): Promise<number> => {
    return 2
  }

  leaseTime = async (): Promise<number> => {
    return 2
  }
}
