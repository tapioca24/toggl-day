#!/usr/bin/env node

const yargs = require('yargs')
const dayjs = require('dayjs')
const tokenUtil = require('./tokenUtil')
const getSummaryReport = require('./getSummaryReport')
const printSummaryReport = require('./printSummaryReport')

const SAVE_TOKEN_USAGE = `Usage:
\t$toggl-day --save-token [token]
`

const argv = yargs
  .scriptName('toggl-day')
  .usage('Show toggl track summary report for the day.')
  .option('save-token', {
    description: 'Save provided token and exit',
    type: 'string'
  })
  .option('date', {
    alias: 'd',
    description: 'Specify the date of the report you want to show\n(format: YYYY-MM-DD)',
    type: 'string'
  })
  .option('no-colors', {
    description: 'Disable colors',
    type: 'boolean'
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .example([
    ['$0 --save-token fc08b73f24644419d', 'Save provided token'],
    ['$0', 'Show the report for today'],
    ['$0 -d 2020-12-01', 'Show the report for Dec. 1, 2020']
  ])
  .locale('en')
  .argv

const today = dayjs().format('YYYY-MM-DD')
const options = {
  date: argv.date || today
}

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
      dateStr: options.date
    })

    printSummaryReport(report, options.date)
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
