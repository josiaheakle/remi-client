
const axios = require('axios')
require('dotenv').config();

const LoginHandler = (() => {

    const apiUrl = process.env.REACT_APP_API_URL;
    let _currentUser = {}
    let _userUpdateCallback = undefined;

    const loginUser = async (email, password) => {

        const options = {
            url: `${apiUrl}/login`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'email': email,
                'password': password
            }
        }

        const res = await axios(options)

        if(res.data.user) {
            _currentUser = res.data.user
            _onUserUpdate()
        }

        return res.data

    }

    const createUser = async (email, phone_number, username, password, time_zone) => {
        const options = {
            url: `${apiUrl}/sign-up`,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'email': email,
                'phone_number': phone_number,
                'username': username,
                'password': password,
                'time_zone': time_zone
            }
        }

        const res = await axios(options)

        if(res.data.user) {
            _currentUser = res.data.user
            _onUserUpdate();
        }

        return res.data;
    }

    const updateUserVerificationInfo = async () => {
        const options = {
            url: `${apiUrl}/verify/info/${_currentUser._id}`,
            method: 'get',
            headers: {
              'Accept': 'application/json',
            }
        }

        const res = await axios(options)

        console.log(`updateuserverification - loginhandler, res: `,res)

        if(res.status === 200) {
            _currentUser.email_verified = res.data.email_verified
            _currentUser.phone_number_verified = res.data.phone_number_verified
            _onUserUpdate()
        }

    }

    const logoutUser = () => {
        _currentUser = undefined;
        _onUserUpdate();
        
    }

    const _onUserUpdate = () => {
        _userUpdateCallback(_currentUser)
    }

    const setUserUpdateCallback = (callback) => {
        _userUpdateCallback = callback;
    }

    const getCurrentUser = () => {
        return _currentUser;
    }

    

    return {
        createUser: createUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        getCurrentUser: getCurrentUser,
        setUserUpdateCallback: setUserUpdateCallback,
        updateUserVerificationInfo: updateUserVerificationInfo
    }


})(); 

export default LoginHandler;