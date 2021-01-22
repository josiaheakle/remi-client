import LoginHandler from './LoginHandler';

const axios = require('axios')
require('dotenv').config();


const VerificationHandler = (() => {

    let _textID = undefined
    // let _emailID = undefined

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
                code: code,
                verificationType: "text"
            }
        }

        const res = await axios(options)
        LoginHandler.updateUserVerificationInfo()
        return res.data;

    }

    const checkEmailVerification = async (code) => {

        const userId = LoginHandler.getCurrentUser()._id

        const options = {
            url: `${process.env.REACT_APP_API_URL}/verify/code`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                id: false,
                userId: userId,
                code: code,
                verificationType: "email"
            }
        }
        const res = await axios(options)
        LoginHandler.updateUserVerificationInfo()
        return res.data;
    }


    const sendVerificationText = async (phoneNum) => {
        // Calls backend text verification
        // rsets _textID as verification id
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
        }

    }

    const sendVerificationEmail = async (userID) => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/verify/email/${userID}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios(options)
            if(res.status !== 200) throw 'Error validating phone number'
            // else _textID = res.data
        } catch (err) {
            console.log(err)
        }
    }

    // const getTextId = () => {
    //     return _textID
    // }

    // const getEmailId = () => {
    //     return _emailID
    // }

    return {
        sendVerificationText: sendVerificationText,
        sendVerificationEmail: sendVerificationEmail,
        checkTextVerification: checkTextVerification,
        checkEmailVerification: checkEmailVerification,
        // getTextId: getTextId,
        // getEmailId: getEmailId
    }

})();

export default VerificationHandler;