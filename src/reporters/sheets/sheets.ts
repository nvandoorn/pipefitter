import { Reporter } from '../../models/reporter.model'
import { Report } from '../../models/report.model'
import { ReportTest } from '../../models/report-test.model'
import { ReportStat } from '../../models/report-stat.model'
import { Context } from '../../models/context.model'

import toSheets from 'array-to-google-sheets'

/**
 * Implementation of a reporter for Google Sheets.
 */
export class Sheets implements Reporter {
  name = 'Google Sheets Reporter'
  buff: Report[] = []
  toSheets
  constructor(private ctx: Context) {
    const { sheetsDocKey, sheetsCredPath } = ctx.config
    const creds = require(`${ctx.rootDir}/${sheetsCredPath}`)
    this.toSheets = new toSheets(sheetsDocKey, creds)
  }

  public record(r: Report): void {
    this.buff.push(r)
  }

  /**
   * Convert this.buff to an array
   * of strings where each string is
   * a row in a spreadsheet
   */
  private toRows(): any[] {
    const rows = []
    if (!this.hasHeader()) {
      rows.push(this.getHeader())
    }
    for (let report of this.buff) {
      for (let test of report.tests) {
        for (let stat of test.stats) {
          rows.push([
            stat.datetime,
            report.adapterName,
            test.testServiceName,
            report.nConnectedClients,
            stat.download,
            stat.upload
          ])
        }
      }
    }
    return rows
  }

  private getHeader(): string[] {
    return [
      `Date/Time`,
      `Adapter Name`,
      `Test Service Name`,
      `Number of Connected Clients`,
      `Download (mb/s)`,
      `Upload (mb/s)`
    ]
  }

  private hasHeader(): boolean {
    return true
  }

  public publish(): Promise<void> {
    return this.toSheets.updateGoogleSheets(
      this.ctx.config.sheetsSheetName,
      this.toRows()
    )
  }
}
