import { TestService } from '../../models/test-service.model'
import { Context } from '../../models/context.model'
import fastTest from 'fast-speedtest-api'

// TODO looks like none of the pre-implemented fast.com
// modules do not support upload speed ;-;
export class Fast implements TestService {
  name = 'Fast.com Speed Test'
  constructor(private ctx: Context) {}
  testDownload = async (): Promise<number> => {
    return 5
  }
  testUpload = async (): Promise<number> => {
    return 5
  }
  serverLocation = async (): Promise<string> => {
    return 'Victoria, BC'
  }
}
