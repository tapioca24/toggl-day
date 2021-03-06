const tokenUtil = require("./utils/tokenUtil")
const datetimeUtil = require("./utils/datetimeUtil")
const getSummaryReport = require("./getSummaryReport")
const printSummaryReport = require("./printSummaryReport")

const main = async ({ token, dateStr }) => {
  if (token != null) {
    if (token === '') {
      throw new Error('No token specified')
    }

    // save token
    const filePath = await tokenUtil.save(token)
      .catch(err => {
        throw new Error(`Failed to save token\n${err.message}`)
      })
    console.log(`Saved a token in \`${filePath}\``)
    return
  }

  // varidate date string
  if (!datetimeUtil.varidateDateStr(dateStr)) {
    throw new Error(`'${dateStr}' is not valid date 'YYYY-MM-DD'`)
  }

  // load token
  const apiToken = await tokenUtil.load()
    .catch(err => {
      if (err.code === 'ENOENT') {
        console.error('Failed to load token\nUse `--save-token` option to save token before everything else')
        process.exit(0)
      }
      throw new Error(`Failed to load token\n${err.message}`)
    })

  // get summary report
  const report = await getSummaryReport({ apiToken, dateStr })
    .catch(err => {
      throw new Error(`Failed to get summary report\n${err.message}`)
    })

  // print summary report
  printSummaryReport(report, dateStr)
}

module.exports = main
