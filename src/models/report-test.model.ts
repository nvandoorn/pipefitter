import { ReportStat } from './report-stat.model'

export interface ReportTest {
  testServiceName: string
  stats: ReportStat[]
}
