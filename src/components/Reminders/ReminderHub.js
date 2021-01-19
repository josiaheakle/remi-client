

import { useEffect, useState } from "react";
import NewReminderForm from "./NewReminderForm.js"
import ActiveReminder from "./ActiveReminder.js"

import '../../styles/ReminderHub.css'
import ReminderHandler from "../../modules/ReminderHandler.js";

import ghIcon from "../../media/GitHubIconLight.png"


const ReminderHub = (props) => {

    // props - user, reminders

    const [ reminderToUpdate, setReminderToUpdate ] = useState(undefined)
    const [ verifyDelete, setVerifyDelete ] = useState(false)
    const [ reminderToDelete, setReminderToDelete ] = useState(undefined)
    const [ editClicked, setEditClicked ] = useState(false)

    // selectedpage - reminders, account, settings

    // useEffect(() => {
    //     if(props.reminders) {
    //         setReminders(props.reminders)
    //     }
    // }, [])

    const editReminder = (rem) => {
        setReminderToUpdate(rem)
        setEditClicked(true)
        setTimeout(() => {
            setEditClicked(false)
        }, 200)
    }

    const deleteReminder = (rem) => {
        setReminderToDelete(rem)
        setVerifyDelete(true)
    }

    const yesDelete = () => {
        ReminderHandler.deleteReminder(reminderToDelete._id)
        // setReminderToUpdate(undefined)
        
        reminderDoneEditing()
        setReminderToDelete(undefined)
        setVerifyDelete(false)
    }

    const noDelete = () => {
        setReminderToDelete(undefined)
        reminderDoneEditing()
        // setReminderToUpdate(undefined)
        setVerifyDelete(false)
    }
 
    const reminderDoneEditing = () => {
        setReminderToUpdate(undefined)
        setEditClicked(true)
        setTimeout(() => {
            setEditClicked(false)
        }, 200)
    }


    return(
        <div className='ReminderHub'>

            {(verifyDelete === true)? 
            <div className='verify-modal-background'>
                <div className='verify-modal'>
                <button className='modal-button' onClick={noDelete}>X</button>
                    <div className='verify-delete-modal-header'> Are you sure you want to delete this reminder? </div>

                    <div className='verify-delete-modal-button-container'>
                        <button onClick={yesDelete} className='verify-delete-modal-button' id='yes-delete-button'> Delete </button>
                        <button onClick={noDelete} className='verify-delete-modal-button' id='no-delete-button'> Cancel </button>
                    </div>
                </div> 
            </div>
            :null}

            <div className='all-user-reminders'>
                <div className='all-user-reminders-header'> Active Reminders </div>

                {(props.reminders) ? props.reminders.map((r,i) => {
                    return <ActiveReminder editReminder={editReminder} deleteReminder={deleteReminder} key={i} reminder={r} />
                }):null}

            </div>

            {(reminderToUpdate !== undefined) ? <NewReminderForm reminder={reminderToUpdate} refresh={editClicked} submitted={reminderDoneEditing} cancelEdit={verifyDelete} /> : <NewReminderForm />}

            <span className='created-by-footer'>Created by
                <a className='footer-link' href="https://josiaheakle.com" title="Josiah Eakle Portfolio">
                    Josiah Eakle
                </a>
                <a href="https://github.com/josiaheakle/reminder-client" title="Github">
                    <img className='je-icon' src={ghIcon} alt='GitHub Icon' />
                </a>
            </span>


        </div>
    );
}

export default ReminderHub;