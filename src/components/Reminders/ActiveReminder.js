import { useEffect, useState } from 'react';

import clearIcon from "../../media/trash.png"
import editIcon from "../../media/edit.png"

const moment = require('moment')

const ActiveReminder = (props) => {
    // props - reminder {reminder object}, editReminder(reminder) {callback}, deleteReminder(reminder) {callback}


    const editReminder = () => {
        props.editReminder(props.reminder)
    }

    const deleteReminder = () => {
        props.deleteReminder(props.reminder)
    }

    const getDateString = (date) => {
        let str = `${moment(date).toDate()}`
        let strArray = str.split('GMT')

        let retStr = strArray[0].slice(0, -4)
        return (retStr)
    }

    return (
        <div className={`ActiveReminder ${props.reminder.title}`}>
            <div className='active-reminder-header'>
                <span className='active-reminder-title'> 
                    {props.reminder.title}
                </span>
                <button onClick={deleteReminder} className='active-reminder-icon-button'> <img className='active-reminder-icon' src={clearIcon}/> </button>
                <button onClick={editReminder} className='active-reminder-icon-button'> <img className='active-reminder-icon' src={editIcon}/> </button>
            </div>
            <span className='active-reminder-next-date'>
                {`Next Reminder:  ${getDateString(props.reminder.next_date)}`}
            </span>
        </div>
    );
}

export default ActiveReminder;