#!/usr/bin/env node

const dayjs = require('dayjs')
const tokenUtil = require('./tokenUtil')
const parseArguments = require('./parseArguments')
const getSummaryReport = require('./getSummaryReport')
const printSummaryReport = require('./printSummaryReport')

const SAVE_TOKEN_USAGE = 'Usage:\n\t$toggl-day --save-token [token]'

const argv = parseArguments()
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
