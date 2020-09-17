const util = require('util')
const TogglClient = require('toggl-api')

const getSummaryReport = async ({ apiToken, dateStr }) => {
  const toggl = new TogglClient({ apiToken })

  const getWorkspaces = util.promisify(toggl.getWorkspaces.bind(toggl))
  const workspaces = await getWorkspaces()

  if (workspaces.length === 0) return
  const workspaceId = workspaces[0].id

  const summaryReport = util.promisify(toggl.summaryReport.bind(toggl))
  const report = await summaryReport({
    workspace_id: workspaceId,
    since: dateStr,
    until: dateStr
  })
  return report
}

module.exports = getSummaryReport
