export enum CollectorErrorCode {
  UNCAUGHT = 0
}
export class CollectorError extends Error {
  public code: CollectorErrorCode
}
