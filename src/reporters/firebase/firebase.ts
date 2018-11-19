import { Reporter } from '../../models/reporter.model'
import { Report } from '../../models/report.model'
import { Context } from '../../models/context.model'

export class Firebase implements Reporter {
  name = 'Firebase Reporter'
  constructor(private ctx: Context) {}
  public record(r: Report): boolean {
    return true
  }

  public async publish(): Promise<boolean> {
    return true
  }
}
