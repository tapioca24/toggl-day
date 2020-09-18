#!/usr/bin/env node

const yargs = require('yargs')
const dayjs = require('dayjs')
const tokenUtil = require('./tokenUtil')
const getSummaryReport = require('./getSummaryReport')
const printSummaryReport = require('./printSummaryReport')

const SAVE_TOKEN_USAGE = `Usage:
$toggl-day --save-token <your token>
`

const today = dayjs().format('YYYY-MM-DD')

const argv = yargs
  .option('save-token', {
    description: 'save provided token and exit',
    type: 'string'
  })
  .option('date', {
    alias: 'd',
    description: 'date to output summary report',
    type: 'string',
    default: today
  })
  .option('no-colors', {
    description: 'disable colors',
    type: 'boolean'
  })
  .argv

const main = async () => {
  if (argv.saveToken != null) {
    if (argv.saveToken === '') {
      console.log(SAVE_TOKEN_USAGE)
      process.exit(1)
    }
    tokenUtil.save(argv.saveToken)
    return
  }

  try {
    const token = await tokenUtil.load()
    const report = await getSummaryReport({
      apiToken: token,
      dateStr: argv.date
    })

    const dateStr = argv.date === today ? 'today' : `on ${argv.date}`
    printSummaryReport(report, dateStr)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(SAVE_TOKEN_USAGE)
    } else {
      console.error(err.message)
    }
    process.exit(1)
  }
}

main()
