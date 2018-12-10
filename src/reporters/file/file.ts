import { Reporter } from '../../models/reporter.model'
import { Report } from '../../models/report.model'
import { Context } from '../../models/context.model'
import { nows as now } from '../../util'

import { writeFile } from 'fs'

const appendToFileName = (path: string, toAppend: string): string => {
  const comps = path.split('.')
  comps.splice(-1, -2, toAppend)
  return comps.join('.')
}

/**
 * Implementation of a Reporter that simply dumps
 * an array of Report objects into a file named
 * using config.reportFilename
 */
export class File implements Reporter {
  name = 'File System Reporter'
  private buff: Report[] = []
  constructor(private ctx: Context) {}
  public record(r: Report): void {
    this.buff.push(r)
  }

  public toString() {
    return JSON.stringify(this.buff, null, 2)
  }

  public publish(): Promise<void> {
    return new Promise((resolve, reject) => {
      const filename = appendToFileName(this.ctx.config.reportFilename, now())
      // the Node fs API has aged great, thanks ry
      writeFile(filename, this.toString(), err =>
        err ? reject(err) : resolve()
      )
    })
  }
}
