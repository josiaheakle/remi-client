import { useState } from "react"
import LoginHandler from "../../modules/LoginHandler.js"

const CreateAccount = (props) => {

    // props 
    //  goBack () 
    //      parent callback when user goes back instead of creating account

    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passVerify, setPassVerify ] = useState('')

    const [ alertMessage, setAlertMessage ] = useState('')

    const passRequirements = (pass) => {
        // Requirements - must have at least one uppercase, one lowercase, and one number

        let hasUpper = false, hasLower = false, hasNum = false;
        for (let i=0; i<pass.length; i++) {
            // console.log(pass[i])

            let code = pass.charCodeAt(i)

            if(pass[i] > '0' && pass[i] < '9') hasNum = true;
            else if(code >= 65 && code <= 90) hasUpper = true;
            else if(code >= 97 && code <= 122) hasLower = true;


        }

        if(hasUpper && hasLower && hasNum) return true
        else return false

    }

    const updateValue = (e) => {
        switch(e.target.id) {
            case('email-input'):
                setEmail(e.target.value)
                break;
            case('password-input'):
                setPassword(e.target.value)
                break;
            case('name-input'):
                setUsername(e.target.value)    
                break;
            case('password-verify-input'):
                setPassVerify(e.target.value)
                break;
        }
    }

    const onCreateAccount = async (e) => {
        e.preventDefault();

        if(password !== passVerify) {
            setAlert('Passwords do not match, please try again.')
        } else if (password.length<8) {
            setAlert('Password must be at least 8 characters.')
        } else if (!passRequirements(password)) {
            setAlert('Password must have at least one uppercase, one lowercase, and one number.')
        }else {
            const res = await LoginHandler.createUser(email, username, password)
            if(res.type !== 'VALID') {
                setAlert(res.message)
            } else {
                const container = document.querySelector('.entry-container-grid')
                container.classList.remove('alert-message-on') 
                setAlert('')  
            }
        }
    }

    const setAlert = (str) => {
        setAlertMessage(str);
        const container = document.querySelector('.entry-container-grid')
        container.classList.add('alert-message-on')
        setAlertMessage(str);
        // const alertMessageDom = document.querySelector('.alert-message')
        // alertMessageDom.classList.add('mounting')
        // setTimeout(() => {
        //     alertMessageDom.classList.remove('mounting')
        // }, 2000)
    }

    return(
        <div>
            {(alertMessage == '')?null:<div className='alert-message'>{alertMessage}</div>}
            <form onSubmit={onCreateAccount} className='login-form create-account-form'>
                <label id='name-input-label' htmlFor='name-input'>Username</label>
                <input onChange={updateValue} id='name-input' name='Display Name' type='text' autoComplete='username' required={true}></input>
                <label htmlFor='email-input'>Email</label>
                <input onChange={updateValue} id='email-input' name='Email' type='email' autoComplete='email' required={true}></input>
                <label htmlFor='password-input'>Password</label>
                <input onChange={updateValue} id='password-input' name='Password' type='password' autoComplete='password' required={true}></input>
                <label htmlFor='password-verify-input'>Verify Password </label>
                <input onChange={updateValue} id='password-verify-input' name='Password Verification' type='password' autoComplete='off' required={true}></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default CreateAccount;