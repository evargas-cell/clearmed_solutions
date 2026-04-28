import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = process.argv[2] || 'http://localhost:5174'
const label = process.argv[3] || ''

const screenshotsDir = path.resolve('..', 'temporary screenshots')
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

// Find next available screenshot number
const existing = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'))
const nums = existing.map(f => parseInt(f.match(/\d+/) ?? ['0'])).filter(n => !isNaN(n))
const next = nums.length > 0 ? Math.max(...nums) + 1 : 1

const filename = label
  ? `screenshot-${next}-${label}.png`
  : `screenshot-${next}.png`
const outPath = path.join(screenshotsDir, filename)

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle2' })
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()

console.log(`Screenshot saved: ${outPath}`)
