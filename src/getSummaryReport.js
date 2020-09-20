const util = require('util')
const TogglClient = require('toggl-api')

const getSummaryReport = async ({ apiToken, dateStr }) => {
  const toggl = new TogglClient({ apiToken })

  // get workspaces
  const getWorkspaces = util.promisify(toggl.getWorkspaces.bind(toggl))
  const workspaces = await getWorkspaces()

  if (workspaces.length === 0) {
    throw new Error('Workspace not found')
  }
  const workspaceId = workspaces[0].id

  // get summary report
  const summaryReport = util.promisify(toggl.summaryReport.bind(toggl))
  const report = await summaryReport({
    workspace_id: workspaceId,
    since: dateStr,
    until: dateStr
  })
  return report
}

module.exports = getSummaryReport
