import "../styles/AccountHub.css"

import checkIcon from "../media/check.png"
// import notIcon from "../media/close.png"
import editIcon from "../media/edit.png"
import cancelIcon from "../media/error.png"
import { useEffect, useState } from "react"
import TimeZoneHandler from "../modules/TimeZoneHandler.js"
import LoginHandler from "../modules/LoginHandler"
import VerificationHub from "./VerificationHub.js"
import { toast } from "react-toastify"

const AccountHub = (props) => {

    const [ isUserVerified, setUserVerified ] = useState(false) 

    //props - user

    const [ alertMessage, setAlertMessage ] = useState(undefined)
    const [ isDeleteModalOpen, setDeleteModalOpen ] = useState(false) 
    const [ isPassModalOpen, setPassModalOpen ] = useState(false)
    const [ pass, setPass ] = useState(undefined)
    const [ editValue, setEditValue ] = useState(undefined)     // EDIT VALUES - undefined, name, email, phone-number, time-zone
    const [ updateObject, setUpdateObject ] = useState({
        field: undefined,
        value: undefined
    }) 


    /* {(props.user.email_verified === true)? 
    <img src={checkIcon} alt='Verified' title='Verified' className='verified-icon' />
    :
        <img src={notIcon} alt="Not Verified" title='Not Verified' className='verified-icon' />
    } */

    const checkUserVerification = () => {
        setUserVerified((!!props.user.phone_number_verified && !!props.user.email_verified))
    }

    const submitUpdate = async (e) => { 

        e.preventDefault()
        let res = await LoginHandler.updateUserInfo(updateObject.field, updateObject.value);
        toast(res)
        cancelEdit()
    }

    const updateValue = (e) => {
        let field;
        switch(editValue) {
            case('name'):
                field = 'username'
                break;
            case('email'):
                field = 'email'
                break;
            case('phone-number'):
                field = 'phone_number'
                break;
            case('time-zone'):
                field = 'time_zone'
                break;
        }
        setUpdateObject({
            field: field,
            value: e.target.value
        })
    }


    const cancelEdit = () => {
        setEditValue(undefined)
    }

    const updatePass = (e) => {
        setPass(e.target.value)
    }

    const deleteUser = () => {
        setDeleteModalOpen(true)
    }

    const yesDelete = async (e) => {
        e.preventDefault()
        let res = await LoginHandler.deleteUser(pass)
        toast(res)
        setDeleteModalOpen(false)
    }

    const noDelete = () => {
        setDeleteModalOpen(false)    
    }


    const editField = (e) => {
        
        let str = e.target.id.split('edit-')
        let target = str[1].split('-button')
        target = target[0]
        
        setEditValue(target)

    }

    const importTimeZones = () => {
        const timeZoneSelector = document.getElementById('time-zone-input')
        let timezones = TimeZoneHandler.getTimeZones()
        timezones.forEach(tz => {
            const op = document.createElement('option')
            op.value = tz
            op.textContent = tz
            timeZoneSelector.appendChild(op)
        })

    }

    const changePassword = () => {
        setPassModalOpen(true)

    }

    const updateNewPassword = (e) => {
        setUpdateObject({
            value: e.target.value,
            field: "password"
        })
    }

    const yesChangePass = async (e) => {
        e.preventDefault()
        let res = await LoginHandler.updateUserPassword(pass, updateObject.value)
        toast(res)
        setPassModalOpen(false)
    }

    const noChangePass = () => { 
        setPassModalOpen(false)
    }


    useEffect(() => {

        switch(editValue) {
            case('name'):
                let nameInput = document.getElementById('name-input')
                nameInput.value = props.user.username
                setUpdateObject({
                    field: 'username',
                    value: props.user.username
                })
                break;
            case('email'):
                let emailInput = document.getElementById('email-input')
                emailInput.value = props.user.email
                setUpdateObject({
                    field: 'email',
                    value: props.user.email
                })
                break;
            case('phone-number'):
                let phoneInput = document.getElementById('phone-input')
                phoneInput.value = props.user.phone_number
                setUpdateObject({
                    field: 'phone_number',
                    value: props.user.phone_number
                })
                
                break;
            case('time-zone'):
                importTimeZones()
                let timeZoneInput = document.getElementById('time-zone-input')
                timeZoneInput.value = props.user.time_zone
                setUpdateObject({
                    field: 'time_zone',
                    value: props.user.time_zone
                })

                break;
        }
    }, [editValue])

    useEffect(() => {
        checkUserVerification()
    }, [])

    return (
        <div className='AccountHub'>

            {(isDeleteModalOpen === true)? 
                <div className='verify-modal-background'>
                    <div className='verify-modal'>
                    <button className='modal-button' onClick={noDelete}>X</button>

                        <div className='verify-delete-modal-header'> To delete your account, enter your password.  </div>

                        <form onSubmit={yesDelete}>
                            <div className='verify-delete-modal-button-container'>
                                <label htmlFor='password-verification'>Password</label>
                                <input type='password' id='password-verification' className='login-input' onChange={updatePass}></input>
                                <button type='submit' onClick={yesDelete} className='verify-delete-modal-button' id='yes-delete-button'> Delete </button>
                                <button onClick={noDelete} className='verify-delete-modal-button' id='no-delete-button'> Cancel </button>
                            </div>
                        </form>
                    </div> 
                </div>
            :null}
            {(isPassModalOpen === true)?
                <div className='verify-modal-background'>
                    <div className='verify-modal'>

                        <button className='modal-button' onClick={noChangePass}>X</button>

                        <div className='verify-delete-modal-header change-pass-header'> To change your password, enter your old password.  </div>

                        <div className='verify-delete-modal-button-container'>
                            <form onSubmit={yesChangePass}>
                                <div className='align-vertical'>
                                    <label htmlFor='password-verification'>Old Password</label>
                                    <input type='password' id='password-verification' className='login-input' onChange={updatePass}></input>
                                    <label htmlFor='password-verification'>New Password</label>
                                    <input type='password' id='password-verification' className='login-input' onChange={updateNewPassword}></input>
                                    <button type='submit' onClick={yesChangePass} className='verify-delete-modal-button change-pass-button' id='yes-change-button'> Update Password </button>
                                    <button onClick={noChangePass} className='verify-delete-modal-button change-pass-button' id='no-change-button'> Cancel </button>
                                </div>
                            </form>
                            {/* <div className='align-vertical space-between'>
                            </div>    */}
                        </div>
                    </div> 
                </div>
            :null}


            <div className='account-hub-header'>
                Account
            </div>

            {(alertMessage)?
                <div className='account-alert-message'>
                    {alertMessage}
                </div>
            : null }

            {(isUserVerified === false) ? <VerificationHub user={props.user} /> : null}


            <div className='account-name-container account-container'>
                {/* NAME */}
                <div id='account-name-label' className='account-label'>
                    Name
                        {(editValue !== 'name')?
                            <div className='account-icon-container' >
                                <button title='Edit'  onClick={editField} className='active-reminder-icon-button icon-button' id='edit-name-button'> 
                                    <img className='active-reminder-icon' id='edit-name-button' src={editIcon}/> 
                                </button>
                            </div>

                        :
                            <div className='account-icon-container editing'>
                                <button title='Update' onClick={submitUpdate} className='active-reminder-icon-button icon-button' id='update-button'> 
                                    <img className='active-reminder-icon' id='update-button' src={checkIcon}/> 
                                </button>             
                                <button title='Cancel' onClick={cancelEdit} className='active-reminder-icon-button icon-button' id='cancel-button'> 
                                    <img className='active-reminder-icon' id='cancel-button' src={cancelIcon}/> 
                                </button> 
                            </div>


                        }
                </div>
                {(editValue === 'name') ? 
                    <form onSubmit={submitUpdate} >
                        <input className='login-input' onChange={updateValue} id='name-input' name='Display Name' type='text' autoComplete='username' required={true}></input>
                    </form>
                : 
                    <span id='account-name'>{(props.user)?`${props.user.username}`:null}</span>
                }
            </div>
            <div className='account-email-container account-container'>
                {/* EMAIL */}
                <div id='account-email-label' className='account-label'>Email

                    {(editValue !== 'email')?
                        <div className='account-icon-container' >
                            <button title='Edit'  onClick={editField} className='active-reminder-icon-button icon-button' id='edit-email-button'> 
                                <img className='active-reminder-icon' id='edit-email-button' src={editIcon}/> 
                            </button>
                        </div>

                    :
                    <div className='account-icon-container editing'>
                        <button title='Update' onClick={submitUpdate} className='active-reminder-icon-button icon-button' id='update-button'> 
                            <img className='active-reminder-icon' id='update-button' src={checkIcon}/> 
                        </button>             
                        <button title='Cancel' onClick={cancelEdit} className='active-reminder-icon-button icon-button' id='cancel-button'> 
                            <img className='active-reminder-icon' id='cancel-button' src={cancelIcon}/> 
                        </button> 
                    </div>
                    }


                </div>
                {(editValue === 'email') ? 
                    <form onSubmit={submitUpdate} >
                        <input className='login-input' onChange={updateValue} id='email-input' name='Email' type='email' autoComplete='email' required={true}></input>
                    </form>
                : 
                    <span id='account-email'>{(props.user)?`${props.user.email}`:null}</span>
                }

                {/* {(props.user.email_verified===false)?
                    <button id='verify-email-button' className='verify-button' >
                        Verify Email
                    </button>
                :null} */}

            </div>
            <div className='account-phone-number-container account-container'>
                {/* PHONE NUMBER */}
                <div id='account-phone-number-label' className='account-label' >Phone Number
                    
                    {(editValue !== 'phone-number')?
                        <div className='account-icon-container' >
                            <button title='Edit' onClick={editField} className='active-reminder-icon-button icon-button' id='edit-phone-number-button'> 
                                <img className='active-reminder-icon' id='edit-phone-number-button' src={editIcon}/> 
                            </button>
                        </div>
                    :
                    <div className='account-icon-container editing'>
                        <button title='Update' onClick={submitUpdate} className='active-reminder-icon-button icon-button' id='update-button'> 
                            <img className='active-reminder-icon' id='update-button' src={checkIcon}/> 
                        </button>             
                        <button title='Cancel' onClick={cancelEdit} className='active-reminder-icon-button icon-button' id='cancel-button'> 
                            <img className='active-reminder-icon' id='cancel-button' src={cancelIcon}/> 
                        </button> 
                    </div>
                    }


                </div>
                {(editValue === 'phone-number') ? 
                <form onSubmit={submitUpdate} >
                    <input className='login-input' onChange={updateValue} id='phone-input' name='Phone Number' type='tel' autoComplete='tel' required={true}></input>
                </form>
                : 
                    <span id='account-phone-number account-container'>
                        {(props.user)?`${props.user.phone_number}`:null}
                    </span>
                }
                {/* {(props.user.email_verified===false)?
                    <button id='verify-email-button' className='verify-button' >
                        Verify Email
                    </button>
                :null} */}
            </div>
            <div className='account-timezone-container account-container'>
                {/* TIME ZONE */}
                <div id='account-time-zone-label' className='account-label'>
                    Time Zone


                        {(editValue !== 'time-zone')?
                        <div className='account-icon-container' >
                            <button title='Edit' onClick={editField} className='active-reminder-icon-button icon-button' id='edit-time-zone-button'> 
                                <img className='active-reminder-icon'  id='edit-time-zone-button' src={editIcon}/> 
                            </button>
                        </div>
                        :
                        <div className='account-icon-container editing'>
                            <button title='Update' onClick={submitUpdate} className='active-reminder-icon-button icon-button' id='update-button'> 
                                <img className='active-reminder-icon' id='update-button' src={checkIcon}/> 
                            </button>             
                            <button title='Cancel' onClick={cancelEdit} className='active-reminder-icon-button icon-button' id='cancel-button'> 
                                <img className='active-reminder-icon' id='cancel-button' src={cancelIcon}/> 
                            </button> 
                        </div>

                        }


                </div>
                {(editValue === 'time-zone') ? 
                <form onSubmit={submitUpdate} >
                    <select className='login-input' onChange={updateValue} name='Time Zone' id='time-zone-input'>
                        <option value='UTC'> --select timezone-- </option>
                    </select>
                </form>
                : 
                    <span id='account-time-zone'>{(props.user)?`${props.user.time_zone}`:null}</span>
                }

            </div>
            <div className='align-horizontal'>
                <button onClick={changePassword} className='new-reminder-input button account-button' id='change-password-button' > Change Password </button>
                <button onClick={LoginHandler.logoutUser} className='new-reminder-input button account-button' id='logout-button' > Logout </button>
            </div>
            <button onClick={deleteUser} className='new-reminder-input button account-button' id='delete-account-button' > Delete Account </button>

            {/* <button onClick={LoginHandler.logoutUser} className='new-reminder-input button' id='logout-button' > Logout </button> */}

                

        </div>
    )
}

export default AccountHub