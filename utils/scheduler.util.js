const schedule = require('node-schedule')

const expiryUpdate = () => {}

const executeJobs = () => {
  const scheduledJob1 = schedule.scheduleJob('0 0 */1 * * *', () => {
    console.log('Executing scheduled job')
    expiryUpdate()
    console.log('Execution completed for scheduled job')
  })
}

module.exports = executeJobs
