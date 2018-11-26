import { TestService } from '../../models/test-service.model'
import { Context } from '../../models/context.model'
import st from 'speedtest-net'

const test = (): Promise<any> =>
  new Promise((resolve, reject) => {
    st({ maxTime: 5000 }).on('data', data => {
      resolve(data)
    })
  })

export class Ookla implements TestService {
  name = 'Speedtest.net (Ookla) Speed Test'
  constructor(private ctx: Context) {}
  testDownload = async (): Promise<number> => {
    const testData = await test()
    return testData.speeds.download
  }
  testUpload = async (): Promise<number> => {
    const testData = await test()
    return testData.speeds.upload
  }
  serverLocation = async (): Promise<string> => {
    const testData = await test()
    return testData.server.location
  }
}
