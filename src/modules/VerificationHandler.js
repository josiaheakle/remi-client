import LoginHandler from './LoginHandler';

const axios = require('axios')
require('dotenv').config();


const VerificationHandler = (() => {

    let _textID = undefined
    let _emailID = undefined

    const checkTextVerification = async (code) => {

        const userId = LoginHandler.getCurrentUser()._id

        const options = {
            url: `${process.env.REACT_APP_API_URL}/verify/code`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                id: _textID,
                userId: userId,
                code: code
            }
        }

        try {
            const res = await axios(options)
            // console.log(`(VERIFICATION HANDLER checkVerificationText) axios res:`)
            // console.log(res)
            if(res.status !== 200) {
                throw 'Status code not 200'
            } 
            else {
                LoginHandler.updateUserVerificationInfo()
                return true
            }
        } catch (err) {
            console.log(err)
            return false
        }

    }

    const sendVerificationText = async (phoneNum) => {
        // Calls backend text verification
        // rsets _textID as verification id

        console.log(`Sending verification text`)

        const options = {
            url: `${process.env.REACT_APP_API_URL}/verify/number/${phoneNum}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios(options)
            // console.log(`(VERIFICATION HANDLER sendVerificationText) axios res:`)
            // console.log(res)
            if(res.status !== 200) throw 'Error validating phone number'
            else _textID = res.data
        } catch (err) {
            console.log(err)
        }

    }

    const sendVerificationEmail = (email) => {

    }

    const getTextId = () => {
        return _textID
    }

    const getEmailId = () => {
        return _emailID
    }

    return {
        sendVerificationText: sendVerificationText,
        sendVerificationEmail: sendVerificationEmail,
        checkTextVerification: checkTextVerification,
        getTextId: getTextId,
        getEmailId: getEmailId
    }

})();

export default VerificationHandler;