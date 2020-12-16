import { Component } from "react";
import Login from "../components/Login/Login.js";
import LoginHandler from "./LoginHandler.js"

const axios = require('axios')
require('dotenv').config();



const ReminderHandler = (() => {

    const apiUrl = process.env.REACT_APP_API_URL;

    /*
  const newReminder = {
    title: req.body.title,
    startdate: req.body.startdate,
    frequency: req.body.frequency,
    description: req.body.description || undefined,
    link: req.body.link || undefined
  }
    */

    let _callback = undefined;

    const setUpdateReminderCallback = (callback) => {
        _callback = callback
    }

    const _updateReminders = () => {
        _callback()
    }

    const createReminder = async (reminderObj) => {

        // console.log(`REMINDER:`)
        // console.log(reminderObj)

        const currentUser = LoginHandler.getCurrentUser()
        // console.log(`userId: ${currentUser._id}`)
        const options = {
            url: `${apiUrl}/reminder/new`,
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {            
                'title': reminderObj.title,
                'start_date': reminderObj.start_date,
                'freq': reminderObj.freq,
                'text': reminderObj.text,
                'time_zone': currentUser.time_zone,
                'user': currentUser._id
            }
        }

        
        const res = await axios(options)
        _updateReminders()
        return res
    }

    const deleteReminder = () => {

    }

    const editReminder = async (id, reminderObj) => {

        const currentUser = LoginHandler.getCurrentUser()

        const options = {
            url: `${apiUrl}/reminder/update/${id}`,
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {            
                'title': reminderObj.title,
                'start_date': reminderObj.start_date,
                'freq': reminderObj.freq,
                'text': reminderObj.text,
                'time_zone': currentUser.time_zone,
                'user': currentUser._id
            }
        }

        const res = await axios(options)
        _updateReminders()
        return res
    }

    const getAllReminders = async () => {

        const currentUser =  LoginHandler.getCurrentUser()

        const options = {
            url: `${apiUrl}/reminder/all/${currentUser._id}`,
            method: 'GET',
        }
        const res = await axios(options)
        return res.data
        

    }

    return {
        createReminder: createReminder,
        editReminder: editReminder,
        getAllReminders: getAllReminders,
        setUpdateReminderCallback: setUpdateReminderCallback,
    }

})(); 

export default ReminderHandler;