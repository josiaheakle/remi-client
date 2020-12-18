import { useEffect, useState } from "react";
import VerificationHandler from "../modules/VerificationHandler";


const VerificationHub = (props) => {
    
    // props - user

    const [ verifyingText, setVerifyingText ] = useState(false)
    const [ verifyingEmail, setVerifyingEmail ] = useState(false)

    const [phoneVerified, setPhoneVerified] = useState(true)
    const [emailVerified, setEmailVerified] = useState(true)

    const [verificationCode, setVerificationCode ] = useState(undefined)

    const verifyText = async () => {
        setVerifyingText(true)
        await VerificationHandler.sendVerificationText(props.user.phone_number)
    }

    const verifyEmail = () => {
        setVerifyingEmail(true)
    }

    const checkVerification = async (e) => {
        e.preventDefault();
        switch(e.target.id) {
            case('text-verification-form'):
                let res = await VerificationHandler.checkTextVerification(verificationCode)
                if (res === true) {
                    setVerifyingText(false)
                    setPhoneVerified(true)
                }
                break;
        }
    }

    const updateCode = (e) => {
        setVerificationCode(e.target.value)
    }

    useEffect(() => {
        setPhoneVerified(!!props.user.phone_number_verified)
        setEmailVerified(!!props.user.email_verified)
    }, [])

    return (

        <div className='VerificationHub'>
            {(!phoneVerified && (!verifyingText && !verifyingEmail ))?<button onClick={verifyText}>Verify Phone Number</button>:null}
            {(!emailVerified && (!verifyingText && !verifyingEmail ))?<button onClick={verifyEmail}>Verify Email</button>:null}
            {(verifyingText)?
                <div className='verification-modal text'>
                    <form id='text-verification-form' onSubmit={checkVerification}>
                        <label htmlFor='verification-code'>Verification Code</label>
                        <input onChange={updateCode} id='varification-code' type='text' maxLength='4'></input>
                        <button type='submit'>Verify</button>
                    </form>
                </div>
            :null}
            {(verifyingEmail)?
                <div className='verification-modal email'>

                </div>
            :null}
        </div>


    );
}

export default VerificationHub;