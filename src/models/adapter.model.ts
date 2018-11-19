import { Context } from './context.model'

/**
 * Adapter interface used to model a physical piece
 * of hardware supplying the internet connection (may be a
 * standalone router or an integrated router).
 *
 * Out of the box, support will be provided
 * for the Actiontec T3200M (modem and router) distributed by
 * Telus. Details such as connection and login are
 * excluded from this interface. The implementer may decide
 * on how and when this is handled (i.e connect in constructor
 * or connect in each of these methods)
 */
export interface Adapter {
  name: string
  isOnline(): Promise<boolean>
  uptime(): Promise<number> // seconds
  nConnectedClients(): Promise<number>
  leaseTime(): Promise<number> // seconds
}
