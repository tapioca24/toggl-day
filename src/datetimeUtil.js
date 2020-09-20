// convert Date object to date string (e.g. new Date() => '2020-09-20')
const date2dateStr = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const yearStr = year.toString()
  const monthStr = month.toString().padStart(2, '0')
  const dayStr = day.toString().padStart(2, '0')

  return `${yearStr}-${monthStr}-${dayStr}`
}

// convert msec to time string (e.g. 12300000 => '3:25:00')
const msec2timeStr = msec => {
  const hour = Math.floor(msec / 3600000)
  const min = Math.floor((msec % 3600000) / 60000)
  const sec = Math.floor((msec % 60000) / 1000)

  const hourStr = hour.toString()
  const minStr = min.toString().padStart(2, '0')
  const secStr = sec.toString().padStart(2, '0')

  let timeStr = `${minStr}:${secStr}`
  if (hour > 0) {
    timeStr = `${hourStr}:${timeStr}`
  }
  return timeStr
}

module.exports = {
  date2dateStr,
  msec2timeStr
}
