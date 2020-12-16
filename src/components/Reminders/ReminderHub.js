

import { useEffect } from "react";
import NewReminderForm from "./NewReminderForm.js"

import '../../styles/ReminderHub.css'

const ReminderHub = (props) => {

    // useEffect(() => {
    //     console.log(props.reminders)
    // }, [])



    return(
        <div className='ReminderHub'>
            <h1> Reminder hub </h1>

            <NewReminderForm />


        </div>
    );
}

export default ReminderHub;