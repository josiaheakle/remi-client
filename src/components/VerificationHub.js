import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VerificationHandler from "../modules/VerificationHandler";


const VerificationHub = (props) => {

    // props - user

    const [verifyingText, setVerifyingText] = useState(false)
    const [verifyingEmail, setVerifyingEmail] = useState(false)

    const [phoneVerified, setPhoneVerified] = useState(true)
    const [emailVerified, setEmailVerified] = useState(true)

    const [verificationCode, setVerificationCode] = useState(undefined)

    const verifyText = async () => {
        setVerifyingEmail(false)
        setVerifyingText(true)
        await VerificationHandler.sendVerificationText(props.user.phone_number)
    }

    const verifyEmail = async () => {
        setVerifyingText(false)
        setVerifyingEmail(true)
        await VerificationHandler.sendVerificationEmail(props.user._id);
    }

    const checkVerification = async (e) => {
        e.preventDefault();
        switch (e.target.id) {
            case ('text-verification-form'):
                let t_res = await VerificationHandler.checkTextVerification(verificationCode)

                console.log(t_res.message)

                // toast(t_res.message)
                setVerifyingText(false)
                if (t_res.type === "SUCCESS") {
                    setPhoneVerified(true)
                }
                break;
            case ('email-verification-form'):
                let e_res = await VerificationHandler.checkEmailVerification(verificationCode)

                console.log(e_res.message)

                setVerifyingEmail(false)
                if(e_res.type === 'SUCCESS') {
                    setEmailVerified(true)
                }
        }
    }

    const cancelVerification = () => {
        setVerifyingEmail(false)
        setVerifyingText(false)
    }

    const updateCode = (e) => {
        setVerificationCode(e.target.value)
    }

    useEffect(() => {
        console.log(`USER UPDATED AT VERIFICATION HUB`)
        console.log(props.user)

        setPhoneVerified(!!props.user.phone_number_verified)
        setEmailVerified(!!props.user.email_verified)
    }, [props.user])

    useEffect(() => {
        setPhoneVerified(!!props.user.phone_number_verified)
        setEmailVerified(!!props.user.email_verified)
    }, [])

    return (

        <div className='VerificationHub'>
            <div className="verify-button-container">
                {(!phoneVerified && (!verifyingText && !verifyingEmail)) ?
                    <button id="verify-phone-button" className="account-verify-button" onClick={verifyText}>Verify Phone</button>
                    : null}
                {(!emailVerified && (!verifyingText && !verifyingEmail)) ?
                    <button id="verify-phone-button" className="account-verify-button" onClick={verifyEmail}>Verify Email</button>
                    : null}
            </div>
            {(verifyingText) ?
                <div className='verify-modal-background'>
                    <div className='verify-modal text'>
                    <button className='modal-button' onClick={cancelVerification}>X</button>

                        <form id='text-verification-form' className='verification-form' onSubmit={checkVerification}>
                            <span className='verification-header' > Verifying Phone Number </span>
                            <label className='verification-label' htmlFor='verification-code'>Please enter your four digit verification code. </label>
                            <input className='verification-input' onChange={updateCode} id='varification-code' type='text' maxLength='4'></input>
                            <button className='verification-button' type='submit'>Verify</button>
                        </form>
                    </div>
                </div>
                : null}
            {(verifyingEmail) ?
                <div className='verify-modal-background'>
                    <div className='verify-modal email'>
                    <button className='modal-button' onClick={cancelVerification}>X</button>

                        <form id='email-verification-form' className='verification-form' onSubmit={checkVerification}>
                            <span className='verification-header' > Verifying Email </span>
                            <label className='verification-label' htmlFor='verification-code'>Please enter your four digit verification code. </label>
                            <input className='verification-input' onChange={updateCode} id='varification-code' type='text' maxLength='4'></input>
                            <button className='verification-button' type='submit'>Verify</button>
                        </form>
                    </div>
                </div>
                : null}
        </div>


    );
}

export default VerificationHub;