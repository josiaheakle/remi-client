import "../styles/AccountHub.css"

// import checkIcon from "../media/check.png"
// import notIcon from "../media/close.png"
import editIcon from "../media/edit.png"
import { useEffect, useState } from "react"


const AccountHub = (props) => {

    //props - user

    const [ editValue, setEditValue ] = useState(undefined)
    // EDIT VALUES - undefined, name, email, phone-number, time-zone

    /* {(props.user.email_verified === true)? 
    <img src={checkIcon} alt='Verified' title='Verified' className='verified-icon' />
    :
        <img src={notIcon} alt="Not Verified" title='Not Verified' className='verified-icon' />
    } */

    const updateValue = () => {
        
    }


    const editField = (e) => {

        let str = e.target.id.split('edit-')
        let target = str[1].split('-button')
        target = target[0]

        setEditValue(target)


        switch(e.target.id) {
            case('edit-name-button'):
                break;
            case('edit-email-button'):
                break;
            case('edit-phone-number-button'):

            case('edit-time-zone-button'):
        }
    }

    useEffect(() => {
        console.log(`editValue: `, editValue)
    }, [editValue])

    return (
        <div className='AccountHub'>
            <div className='account-hub-header'>
                Account
            </div>
            <div className='account-name-container account-container'>
                <div id='account-name-label' className='account-label'>
                    Name
                    <div className='account-icon-container' >
                        <button onClick={editField} className='active-reminder-icon-button' id='edit-name-button'> <img className='active-reminder-icon' id='edit-name-button' src={editIcon}/> </button>
                    </div>
                </div>
                <span id='account-name'>{(props.user.username)}</span>

            </div>
            <div className='account-email-container account-container'>
                <div id='account-email-label' className='account-label'>Email
                    <div className='account-icon-container' >
                        <button onClick={editField} className='active-reminder-icon-button' id='edit-email-button'> <img className='active-reminder-icon' id='edit-email-button' src={editIcon}/> </button>
                    </div>

                </div>
                <span id='account-email'>{(props.user.email)}</span>
            </div>
            <div className='account-phone-number-container account-container'>
                <div id='account-phone-number-label' className='account-label' >Phone Number
                    <div className='account-icon-container' >
                        <button onClick={editField} className='active-reminder-icon-button' id='edit-phone-number-button'> <img className='active-reminder-icon' id='edit-phone-number-button' src={editIcon}/> </button>
                    </div>
                </div>
                <span id='account-phone-number account-container'>
                    {(props.user.phone_number)}
                </span>
            </div>
            <div className='account-timezone-container account-container'>
                <div id='account-time-zone-label' className='account-label'>
                    Time Zone
                    <div className='account-icon-container' >
                        <button onClick={editField} className='active-reminder-icon-button' id='edit-time-zone-button'> <img className='active-reminder-icon'  id='edit-time-zone-button' src={editIcon}/> </button>
                    </div>
                </div>
                {(editValue === 'time-zone') ? 
                    <select className='login-input' onChange={updateValue} name='Time Zone' id='time-zone-input'>
                        <option value='UTC'> --select timezone-- </option>
                    </select>
                
                : 
                    <span id='account-time-zone'>{(props.user.time_zone)}</span>
                }

            </div>
        </div>
    )
}

export default AccountHub