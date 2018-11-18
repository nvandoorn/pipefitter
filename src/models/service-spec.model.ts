/**
 * ServiceSpec interface used to model an
 * offering from an ISP. This requires knowledge
 * of the download and upload speed, and also how
 * much tolerance should be allowed when making
 * comparsions
 */
export interface ServiceSpec {
  expectedDownload: number // kb/s
  expectedUpload: number
  toleranceDelta: number // tolerence expressed as a difference
  toleranceStdDeviation: number // tolerence expressed as a standard deviation
}
