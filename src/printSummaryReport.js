const chalk = require('chalk')
const dayjs = require('dayjs')
const colorUtil = require('./colorUtil')
const log = console.log

const formatTime = timeMs => {
  const hour = Math.floor(timeMs / 3600000)
  const min = Math.floor((timeMs % 3600000) / 60000)
  const sec = Math.floor((timeMs % 60000) / 1000)

  const hourStr = hour.toString()
  const minStr = min.toString().padStart(2, '0')
  const secStr = sec.toString().padStart(2, '0')

  let formattedStr = `${minStr}:${secStr}`
  if (hour > 0) {
    formattedStr = `${hourStr}:${formattedStr}`
  }

  return formattedStr
}

const printProject = data => {
  const hexColor = data.title.hex_color
  const project = data.title.project

  const point = '- '
  const brightness = colorUtil.hexColor2Brightness(hexColor)
  const fontColor = brightness < 100 ? chalk.white : chalk.black
  const text = point + fontColor.bgHex(hexColor)(`${project}`)
  log(text)
}

const printTask = item => {
  const timeMs = item.time
  const formattedTime = formatTime(timeMs)
  const task = item.title.time_entry

  const point = '  - '
  const text = `${point}${task} ` + chalk.gray(`(${formattedTime})`)
  log(text)
}

const printSummaryReport = (report, date) => {
  if (report.data.length === 0) {
    const today = dayjs().format('YYYY-MM-DD')
    const dateStr = date === today ? 'today' : date
    console.log(`There are no tasks completed ${dateStr} yet.`)
    return
  }

  for (const data of report.data) {
    printProject(data)
    for (const item of data.items) {
      printTask(item)
    }
  }
}

module.exports = printSummaryReport
