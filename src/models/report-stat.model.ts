/**
 * Report interface used to model a single data
 * point reported by this app. Each time a test is performed,
 * this is the result that will be reported.
 */
export interface ReportStat {
  download: number // speeds defined in kbits/s
  upload: number
  datetime: number // unix epoch seconds
}
