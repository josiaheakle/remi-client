
const axios = require('axios')
require('dotenv').config();

const LoginHandler = (() => {

    const apiUrl = process.env.REACT_APP_API_URL;
    let _currentUser = {}
    let _userUpdateCallback = undefined;

    const loginUser = async (email, password) => {

        const options = {
            url: `${apiUrl}/user/login`,
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
        return res.data.message

    }

    const createUser = async (email, phone_number, username, password, time_zone) => {
        const options = {
            url: `${apiUrl}/user/new`,
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

        return res.data.message;
    }

    const updateUserInfo = async (field, value) => {


        const options = {
            url: `${apiUrl}/user/update`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'field': field,
                'value': value,
                'user': _currentUser._id
            }
        }

        try {

            const res = await axios(options) 
            if(res.data.type === 'SUCCESS') {
                if(field === 'email') {
                    _currentUser.email_verified = false
                } else if (field === 'phone_number') {
                    _currentUser.phone_number_verified = false
                }
                _currentUser[field] = value
                _onUserUpdate()
            } else {
                throw {
                    type: res.data.type,
                    message: res.data.message
                }
            }
            return res.data.message

        } catch (err) {
            return err
        }


    }

    const updateUserPassword = async (oldPass, newPass) => {
        const options = {
            url: `${apiUrl}/user/update`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'field': 'password',
                'value': newPass,
                'user': _currentUser._id,
                'password': oldPass
            }
        }

        const res = await axios(options) 
        return res.data.message

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

        if(res.status === 200) {
            _currentUser.email_verified = res.data.email_verified
            _currentUser.phone_number_verified = res.data.phone_number_verified
            _onUserUpdate()
        }

        return res.data.message

    }

    const deleteUser = async (password) => {

        let userId = _currentUser._id

        const options = {
            url: `${apiUrl}/user/delete`,
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                user: userId,
                password: password
            }
        }

        const res = await axios(options)

        if(res.data.success === true) {
            _currentUser = undefined;
            _onUserUpdate()
        }

        return res.data.message
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
        deleteUser: deleteUser,
        logoutUser: logoutUser,
        updateUserInfo: updateUserInfo,
        getCurrentUser: getCurrentUser,
        setUserUpdateCallback: setUserUpdateCallback,
        updateUserVerificationInfo: updateUserVerificationInfo,
        updateUserPassword: updateUserPassword
    }


})(); 

export default LoginHandler;