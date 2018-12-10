import { ReportTest } from './report-test.model'

export interface Report {
  isOnline?: boolean
  nConnectedClients?: number
  uptime?: number
  leaseTime?: number
  adapterName?: string
  datetime: number
  tests: ReportTest[]
}
