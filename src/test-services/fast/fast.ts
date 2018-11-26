import { TestService } from '../../models/test-service.model'
import { Context } from '../../models/context.model'
import puppeteer from 'puppeteer'
import Observable from 'zen-observable'

// lifted from here: https://github.com/sindresorhus/fast-cli
// MIT License
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
async function init(browser, page, observer, prevSpeed?) {
  const result = await page.evaluate(() => {
    const $ = document.querySelector.bind(document)

    return {
      speed: Number($('#speed-value').textContent),
      unit: $('#speed-units').textContent.trim(),
      isDone: Boolean($('#speed-value.succeeded'))
    }
  })

  if (result.speed > 0 && result.speed !== prevSpeed) {
    observer.next(result)
  }

  if (result.isDone) {
    browser.close()
    observer.complete()
  } else {
    setTimeout(init, 100, browser, page, observer, result.speed)
  }
}

const makeFastObservable = () =>
  new Observable(observer => {
    // Wrapped in async IIFE as `new Observable` can't handle async function
    ;(async () => {
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
      const page = await browser.newPage()

      await page.goto('https://fast.com')
      await init(browser, page, observer)
    })().catch(observer.error.bind(observer))
  })

// TODO looks like none of the pre-implemented fast.com
// modules do not support upload speed ;-;
export class Fast implements TestService {
  name = 'Fast.com Speed Test'
  constructor(private ctx: Context) {}
  testDownload = async (): Promise<number> => {
    const readings = []
    await makeFastObservable().forEach((result, i: number) => {
      if (i > this.ctx.config.nTestSamples) {
        return
      } else {
        readings.push(result.speed)
      }
    })
    return readings.reduce((a, b) => a + b) / readings.length
  }
  // TODO implement
  testUpload = async (): Promise<number> => {
    return -1
  }
  serverLocation = async (): Promise<string> => {
    return 'Victoria, BC'
  }
}
