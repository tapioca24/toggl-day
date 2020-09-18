#!/usr/bin/env node

const yargs = require('yargs')
const dayjs = require('dayjs')
const tokenUtil = require('./tokenUtil')
const getSummaryReport = require('./getSummaryReport')
const printSummaryReport = require('./printSummaryReport')

const SAVE_TOKEN_USAGE = `Usage:
\t$toggl-day --save-token [token]
`

const today = dayjs().format('YYYY-MM-DD')

const argv = yargs
  .usage("Output today's Toggl Track summary report.")
  .option('save-token', {
    description: 'Save provided token and exit',
    type: 'string'
  })
  .option('date', {
    alias: 'd',
    description: 'Date to output summary report (e.g. 2020-12-31)',
    type: 'string'
  })
  .option('no-colors', {
    description: 'Disable colors',
    type: 'boolean'
  })
  .alias('v', 'version')
  .alias('h', 'help')
  .locale('en')
  .argv

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
