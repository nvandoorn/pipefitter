import { Context } from './context.model'

/**
 * TestService interface used to model
 * an internet speed test service. Out of the box
 * we will support Ookla and Fast.com. Many ISPs
 * will only accept results from a specific service
 * so it be cool to support quite a few of these.
 */
export interface TestService {
  constructor(ctx: Context)
  testDownload(): Promise<number> // kb/s
  testUpload(): Promise<number>
  serverLocation(): Promise<string> // eg. Victoria, BC
}
