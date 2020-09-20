const chalk = require('chalk')
const colorUtil = require('./utils/colorUtil')
const datetimeUtil = require('./utils/datetimeUtil')

// print project
const printProject = (data, totalTime) => {
  const hexColor = data.title.hex_color
  const project = data.title.project

  const percentage = Math.round(data.time / totalTime * 100)

  const point = '- '
  const brightness = colorUtil.hexColor2Brightness(hexColor)
  const fontColor = brightness < 100 ? chalk.white : chalk.black
  const text = point + fontColor.bgHex(hexColor)(`${project}`) + ' ' + chalk.gray(`(${percentage}%)`)
  console.log(text)
}

// print task
const printTask = item => {
  const timeMs = item.time
  const timeStr = datetimeUtil.msec2timeStr(timeMs)
  const task = item.title.time_entry

  const point = '  - '
  const text = `${point}${task} ` + chalk.gray(`(${timeStr})`)
  console.log(text)
}

const printSummaryReport = (report, dateStr) => {
  if (report.data.length === 0) {
    const today = datetimeUtil.date2dateStr(new Date())
    const date = dateStr === today ? 'today' : dateStr
    console.log(`There are no tasks completed ${date} yet.`)
    return
  }

  for (const data of report.data) {
    printProject(data, report.total_grand)
    for (const item of data.items) {
      printTask(item)
    }
  }
}

module.exports = printSummaryReport
