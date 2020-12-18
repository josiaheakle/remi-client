import ReminderHandler from './ReminderHandler';
const schedule = require('node-schedule')
const moment = require('moment')



const Scheduler = (() => {

    const scheduleAllUpdates  = (reminders) => {
        reminders.forEach(r => {
            scheduleUpdate(r)
        })
    }

    const scheduleUpdate = (reminder) => {
        // const dateAndTime = reminder.next_date.split('T')
        // const reminderDate = moment.tz(`${dateAndTime[0]} ${dateAndTime[1]}`, reminder.time_zone).format()
        let scheduleTime = moment(reminder.next_date).add(30, 'second').toDate()
        let job = schedule.scheduleJob(scheduleTime, () => {
            ReminderHandler.updateReminders()
        });
    }

    return {
        scheduleAllUpdates: scheduleAllUpdates,
        scheduleUpdate: scheduleUpdate
    }

})();

export default Scheduler;