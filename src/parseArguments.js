const yargs = require('yargs')

const parseArguments = () => {
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

  return argv
}

module.exports = parseArguments
