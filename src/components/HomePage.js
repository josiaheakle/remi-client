// import LoginHandler from "../modules/LoginHandler.js"
import { Link } from "react-router-dom"

import { useState, useEffect } from "react"

import '../styles/HomePage.css'
import VerificationHandler from "../modules/VerificationHandler.js"
import VerificationHub from "./VerificationHub.js"
import ReminderHub from './Reminders/ReminderHub.js'
import AccountHub from './AccountHub.js'

import reminderIcon from "../media/reminders.png"
import accountIcon from "../media/user_transparent.png"
import ghIcon from "../media/GitHubIconLight.png"


const HomePage = (props) => {

    // props - user, reminders

    const [introText, setIntroText] = useState('');
    const [stopAnimation, setStopAnimation] = useState(false);
    const [isUserVerified, setUserVerified] = useState(false);

    const [selectedPage, setSelectedPage] = useState('reminders') // reminders, account

    let fullIntroText = '';

    const updateIntroText = () => {
        if (props.user) {
            setUserVerified((!!props.user.phone_number_verified && !!props.user.email_verified))
            if (!props.user.phone_number_verified && !props.user.email_verified) {
                fullIntroText = `Welcome${(props.user) ? `, ${props.user.username}!` : '!'} Now before we can get started, you will need to verify your phone number and email or I won't be able to send any reminders. Click the buttons below to begin the verification process.`;
            } else if (!props.user.phone_number_verified && props.user.email_verified) {
                fullIntroText = `Welcome${(props.user) ? `, ${props.user.username}!` : '!'} Before I can send any text reminders, you will need to verify your phone number. Press the button below to start.`;
            } else if (props.user.phone_number_verified && !props.user.email_verified) {
                fullIntroText = `Welcome${(props.user) ? `, ${props.user.username}!` : '!'} Before I can send any email reminders, you will need to verify your email. Press the button below to start.`;
            } else {
                fullIntroText = `Welcome${(props.user) ? `, ${props.user.username}!` : '!'}`;
            }
        } else {
            fullIntroText = `Welcome!`;
        }
    }

    let introTextPlaceholder = '';
    let i = 0;
    const animateNextLetter = (pauseBool) => {
        if (i <= fullIntroText.length) {
            setIntroText(introTextPlaceholder)
            setTimeout(() => {
                if (!pauseBool) introTextPlaceholder = `${introTextPlaceholder}${fullIntroText[i++]}`
                else pauseBool = false;
                if (fullIntroText[i] === '.') pauseBool = true;
                if (!stopAnimation) animateNextLetter();
            }, 80)
        }
    }

    const changePage = (e) => {

        console.log(`Changing Page: `, e.target)

        switch(e.target.id) {
            case('page-selection-reminders'):
                setSelectedPage('reminders')

                break;
            case('page-selection-account'):
                setSelectedPage('account')
                break;
        }
    }

    // const sendVerificationText = () => {
    //     const phoneNum = props.user.phone_number;
    //     VerificationHandler.sendVerificationText(phoneNum)
    // }

    // const sendVerificationEmail = () => {

    // }

    // useEffect(() => {
    //     console.log(`is user verified? ${isUserVerified}` )
    // }, [isUserVerified])

    useEffect(() => {

        const reminderSelection = document.getElementById('page-selection-reminders')
        const accountSelection = document.getElementById('page-selection-account')

        switch(selectedPage) {
            case('reminders'):
                accountSelection.classList.remove('selected')
                reminderSelection.classList.add('selected')
                break;
            case('account'):
                accountSelection.classList.add('selected')
                reminderSelection.classList.remove('selected')
                break;
        }

    }, [selectedPage])

    useEffect(() => {
        updateIntroText();
        return () => {
            setStopAnimation(true)
        }
    }, [])

    useEffect(() => {
        if (fullIntroText !== '') {
            animateNextLetter();
        }
    }, [introText])

    return (
        <div className="HomePage">

            <div className='visual-container'>

                <div className='remi-text-container'>
                    {introText}
                </div>

                {(isUserVerified === false) ? <VerificationHub user={props.user} /> : null}


                <div className='page-selector'>
                    <div onClick={changePage} title='Reminders' className='page-selection selected' id='page-selection-reminders'>
                        <img className='page-selection-image' src={reminderIcon} id='page-selection-reminders' />
                    </div>
                    <div onClick={changePage} title='Account' className='page-selection' id='page-selection-account'>
                        <img className='page-selection-image' src={accountIcon} id='page-selection-account' />
                    </div>
                </div>
                
                {(selectedPage==='reminders')?<ReminderHub user={props.user} reminders={props.reminders} /> : (selectedPage==='account')? <AccountHub user={props.user} /> :null}
                

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

export default HomePage;