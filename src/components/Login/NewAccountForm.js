

import {useEffect, useState} from "react"

const NewAccountForm = ( props ) => {
    // PROPS
    //  onFormSubmit(user)

    /*
        user = {
        name:"name"
        email:"email@email.com"
        password: "********"
        }
    */

    const [ userName, setUserName ] = useState('')
    const [ userEmail, setUserEmail ] = useState('')
    const [ userPassword, setUserPassword ] = useState('')

    const sendUser = () => {
        const user = {
            user: userName,
            email: userEmail,
            password: userPassword,
        }
        props.onFormSubmit(user)
    }
    return(
        <div className='NewAccountForm'>
            <form id='login-form' onSubmit={validateEmailAndPassword} >
                <label htmlFor='email-input'>Email</label>
                <input onChange={updateValue} id='email-input' name='Email' type='email'></input>
                <label htmlFor='password-input'>Password</label>
                <input onChange={updateValue} id='password-input' name='Password' type='password'></input>
                <button type='submit' >submit</button>
            </form>
        </div>
    );
}