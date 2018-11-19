import { TestService } from '../../models/test-service.model'
import { Context } from '../../models/context.model'

export class Ookla implements TestService {
  name = 'Speedtest.net (Ookla) Speed Test'
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
