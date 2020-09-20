const fs = require('fs')
const util = require('util')

const USER_HOME_DIR = process.env['HOME']
const CONFIG_FILE_PATH = `${USER_HOME_DIR}/.toggl-day`

const saveToken = async token => {
  const writeFile = util.promisify(fs.writeFile)
  await writeFile(CONFIG_FILE_PATH, token)
  return CONFIG_FILE_PATH
}

const loadToken = async () => {
  const readFile = util.promisify(fs.readFile)
  const token = await readFile(CONFIG_FILE_PATH, 'utf-8')
  return token
}

module.exports = {
  save: saveToken,
  load: loadToken
}
