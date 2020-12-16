
import { useEffect, useState } from "react";
import ReminderHandler from "../../modules/ReminderHandler.js"
import TimeZoneHandler from "../../modules/TimeZoneHandler.js"

    /*
  const newReminder = {
    title: req.body.title,
    start_date: req.body.startdate,
    frequency: req.body.frequency,
    text_string: req.body.description || undefined,
    link: req.body.link || undefined
  }
    */

const NewReminderForm = () => {

    const [ title, setTitle ] = useState(undefined)
    const [ start_date, setStartDate ] = useState(undefined)
    const [ frequency, setFrequency ] = useState('Once')
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
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const res = await ReminderHandler.createReminder({
            title: title,
            start_date: start_date,
            freq: frequency,
            text: text,
        })
        console.log(res)
    }



    return (
        <div className='NewReminderForm'>
            <form onSubmit={submitForm}>
                <label id='title-input-label' htmlFor='name-input'>Title</label>
                <input onChange={updateValue} id='title-input' name='Title' type='text' required={true}></input>
                <label htmlFor='text-string-input'>Reminder</label>
                <textarea onChange={updateValue} id='text-string-input' name='Description' type='text' required={false}></textarea>
                <label htmlFor='start-date-input'>Date</label>
                <input onChange={updateValue} id='start-date-input' name='Start Date' type='datetime-local' required={true}></input>
                <label htmlFor='frequency-input'>Frequency</label>
                <select onChange={updateValue} name='Frequency' id='frequency-input' required={true}>
                    <option value='once'>Once</option>
                    <option value='daily'>Daily</option>
                    <option value='weekly'>Weekly</option>
                    <option value='bi-weekly'>Bi-Weekly</option>
                    <option value='monthly'>Monthly</option>
                    <option value='yearly'>Annually</option>
                </select>
                <button type='submit'> Submit </button>
            </form>
        </div>
    );
}

export default NewReminderForm;