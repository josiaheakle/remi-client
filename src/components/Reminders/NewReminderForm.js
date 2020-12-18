import { useEffect, useState } from "react";
import ReminderHandler from "../../modules/ReminderHandler.js"
import TimeZoneHandler from "../../modules/TimeZoneHandler.js"
import ReminderHub from "./ReminderHub.js";

import cancelIcon from "../../media/error.png"

const moment = require('moment')

    /*
  const newReminder = {
    title: req.body.title,
    start_date: req.body.startdate,
    frequency: req.body.frequency,
    text_string: req.body.description || undefined,
    link: req.body.link || undefined
  }
    */

const NewReminderForm = (props) => {

    // props - reminder = object (IF YOU ARE EDITING A REMINDER), refresh = bool, if true refresh edit values, submitted: callback(), cancelEdit = bool, if true cancelEdit

    const [ editingReminder, setEditingReminder ] = useState(false)

    const [ title, setTitle ] = useState(undefined)
    const [ start_date, setStartDate ] = useState(undefined)
    const [ frequency, setFrequency ] = useState('Once')
    const [ reminderType, setReminderType ] = useState('text')
    const [ text, setTextString ] = useState(undefined)

    const updateValue = (e) => {
        switch(e.target.id) {
            case('title-input'):
                setTitle(e.target.value)
                break;
            case('text-string-input'):
                setTextString(e.target.value)
                break;
            case('start-date-input'):
                setStartDate(e.target.value)    
                break;
            case('frequency-input'):
                setFrequency(e.target.options[e.target.selectedIndex].text)
                break;
            case('reminder-type-input'):
                setReminderType(e.target.options[e.target.selectedIndex].text)
                break;
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        e.target.reset()
        if(!props.reminder) {
            const res = await ReminderHandler.createReminder({
                title: title,
                start_date: start_date,
                freq: frequency,
                text: text,
                type: reminderType
            })
            console.log(res)
        } else {
            props.submitted()

            const newRem = {
                title: title,
                start_date: start_date,
                freq: frequency,
                text: text,
                type: reminderType
            }

            const res = await ReminderHandler.editReminder(props.reminder._id, newRem)
            setEditingReminder(false)
            console.log(res)
            ReminderHandler.updateReminders()
        }
    }

    const updateEditValues = () => {

        const titleInput = document.getElementById('title-input')
        const textInput = document.getElementById('text-string-input')
        const dateInput = document.getElementById('start-date-input')
        const freqInput = document.getElementById('frequency-input')
        const typeInput = document.getElementById('reminder-type-input')

        const title = props.reminder.title || ''
        const text = props.reminder.text || ''
        const date = props.reminder.start_date || ''
        const freq = props.reminder.freq || 'Once'
        const type = props.reminder.type || 'Text'

        setTitle(title)
        setTextString(text)
        setStartDate(date)
        setFrequency(freq)
        setReminderType(type)

        titleInput.value = title
        textInput.value = text
        dateInput.value = moment(date).format("YYYY-MM-DDTHH:mm:ss")
        freqInput.value = freq
        typeInput.value = type

    }

    const cancelEdit = () => {

        const reminderForm = document.querySelector('.new-reminder-form')
        reminderForm.reset()

        setEditingReminder(false)
        props.submitted()

    }



    useEffect(() => {
        if(editingReminder === true) updateEditValues()
    }, [editingReminder])

    useEffect(() => {
        if(props.reminder) {
            setEditingReminder(true)
        } else {
            setEditingReminder(false)
        }   
        if(props.refresh) {
            if(props.refresh === true) updateEditValues()
        }
        if(props.cancelEdit){
            if(props.cancelEdit === true) cancelEdit()
        }

    }, [props])

    return (
        <div className='NewReminderForm'>
            {(editingReminder===true)?

                <div className='new-reminder-form-header'> 
                    <span className='form-header-text'> Editing Reminder </span>
                    <div className='new-reminder-button-container'>
                        <button onClick={cancelEdit} className='new-reminder-icon-button' > 
                            <img className='new-reminder-icon' src={cancelIcon} /> 
                        </button>
                    </div>
                </div>
            :
                <div className='new-reminder-form-header'> 
                    <span className='form-header-text'> New Reminder </span>
                </div>
            }
            <form className='new-reminder-form' onSubmit={submitForm}>
                <label className='new-reminder-label' id='title-input-label' htmlFor='name-input'>Title</label>
                <input className='new-reminder-input' onChange={updateValue} id='title-input' name='Title' type='text' required={true}>
                </input>
                <label className='new-reminder-label' htmlFor='text-string-input'>Reminder</label>
                <textarea className='new-reminder-input large' onChange={updateValue} id='text-string-input' name='Description' type='text' required={false}>
                </textarea>
                <label className='new-reminder-label' htmlFor='start-date-input'>Date</label>
                <input className='new-reminder-input' onChange={updateValue} id='start-date-input' name='Start Date' type='datetime-local' required={true}>
                </input>
                <div className='align-horizontal'>
                    <div className='align-vertical'>
                        <label className='new-reminder-label' htmlFor='frequency-input'>Frequency</label>
                        <select className='new-reminder-input small' onChange={updateValue} name='Frequency' id='frequency-input' required={true}>
                            <option value='Once'>Once</option>
                            <option value='Daily'>Daily</option>
                            <option value='Weekly'>Weekly</option>
                            <option value='Bi-Weekly'>Bi-Weekly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Yearly'>Annually</option>
                        </select>
                    </div>
                    <div className='align-vertical'>
                        <label className='new-reminder-label' htmlFor='reminder-type-input'>Type</label>
                        <select className='new-reminder-input small' onChange={updateValue} name='Reminder Type' id='reminder-type-input' required={true}>
                            <option value='Text'>Text</option>
                            <option value='Email'>Email</option>
                            <option value='Both'>Both</option>
                        </select>
                    </div>
                </div>

                
                <button className='new-reminder-input button' type='submit'> Submit </button>
            </form>
        </div>
    );
}

export default NewReminderForm;