
import { useState, useEffect } from "react"

import ghIcon from "../../media/GitHubIconLight.png"

import "../../styles/EntryPage.css"

import Login from "./Login.js"
import CreateAccount from "./CreateAccount.js"

const EntryPage = (  ) => {

    const [createAccountOpen, setCreateAccountOpen] = useState(false)
    const [introText, setIntroText] = useState('');
    const [stopAnimation, setStopAnimation] = useState(false)

    let fullIntroText = 'Hello, my name is Remi. I can help you schedule text remiders and create checklists. Login or create an account and we can get started!';
    let introTextPlaceholder = '';
    let i = 0;
    const animateNextLetter = (pauseBool) => {
        if(i<=fullIntroText.length) {
            setIntroText(introTextPlaceholder)
            setTimeout(() => {
                if(!pauseBool) introTextPlaceholder = `${introTextPlaceholder}${fullIntroText[i++]}`
                else pauseBool = false;
                if(fullIntroText[i] === '.') pauseBool = true;
                if(!stopAnimation) animateNextLetter();
            }, 100)
        }
    }

    const createAccount = () => {

        const loginHeader = document.querySelector('.login-main-header')
        loginHeader.classList.add('create-account')

        const container = document.querySelector('.entry-container-grid')
        container.classList.remove('alert-message-on')
        setCreateAccountOpen(true);
    }

    const closeCreateAccount = () => {

        const loginHeader = document.querySelector('.login-main-header')
        loginHeader.classList.remove('create-account')


        const container = document.querySelector('.entry-container-grid')
        container.classList.remove('alert-message-on')   
        setCreateAccountOpen(false);
    }

    useEffect(() => {
        animateNextLetter();
        return () => {
            setStopAnimation(true)
        }
    }, [])

    return (
        <div className='EntryPage' >

            <div className='entry-center-container'>
                <div id='intro-text-container'>
                    <div id='intro-text'>
                        {introText}
                    </div>
                </div>

                <div className={`entry-container-grid ${(!createAccountOpen) ? 'login' : 'create-account'}`}>
                    {(createAccountOpen)?
                        <div className='go-back-button-container'>
                            <button onClick={closeCreateAccount} type='button' className='go-back-button'><i className='material-icons'>arrow_back</i></button>
                        </div>
                    :null}
                    <div className='login-container-header'>
                        <h2 className="login-main-header"> {(!createAccountOpen)? `login` : `new account`} </h2>
                    </div>

                    {(createAccountOpen === false) ?
                        <div className='create-account-closed'>
                            <Login />
                            <div className='create-account-container login-container'>
                                <h3 className='login-header'>Need an account?</h3>
                                <button onClick={createAccount}> Create Account </button>
                            </div>
                        </div>
                        :
                        <CreateAccount />
                    }

                </div>
            </div>

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

export default EntryPage;