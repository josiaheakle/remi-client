import { useState } from "react"
import LoginHandler from "../../modules/LoginHandler.js"

const Login = (props) => {

    // props 
    //  loginSuccess ()
    //      parent callback to tell entry page login is complete

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alertMessage, setAlertMessage ] = useState('')


    const updateValue = (e) => {
        switch(e.target.id) {
            case('email-input'):
                setEmail(e.target.value)
                break;
            case('password-input'):
                setPassword(e.target.value)
                break;
        }
    }

    const onLogin = async (e) => {
        e.preventDefault();
        const container = document.querySelector('.entry-container-grid')

        const res = await LoginHandler.loginUser(email, password)
        console.log(res)
        if(res.type !== 'VALID') {
            setAlert(res.message)
        } else {
            container.classList.remove = 'alert-message-on'
            
        }
    }

    const setAlert = (str) => {
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
            <form onSubmit={onLogin} className='login-form' >
                <label htmlFor='email-input'>Email</label>
                <input className='login-input' onChange={updateValue} id='email-input' name='Email' type='email' autoComplete='email' required={true} ></input>
                <label htmlFor='password-input'>Password</label>
                <input className='login-input' onChange={updateValue} id='password-input' name='Password' type='password' autoComplete='password' required={true} ></input>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;