// react 
import { Component, useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

// components
import EntryPage from "./Login/EntryPage.js"
import HomePage from "./HomePage.js"

// media
import bgImg from "../media/coffee-and-map.jpg"

// modules
import LoginHandler from "../modules/LoginHandler.js"
import ReminderHandler from "../modules/ReminderHandler.js"

// css
import 'react-toastify/dist/ReactToastify.css';
import "../styles/style.css"

const App = () => {

  const [ user, setUser ] = useState(undefined);
  const [ isUserLoggedIn, setUserLoggedIn ] = useState(false);
  const [ reminders, setReminders ] = useState(undefined)

  const updateUser = (newUser) => {
    setUser(newUser)
  }

  const updateLoggedInStatus = () => {
    if(user !== undefined) {
      setUserLoggedIn(true)
    } else {
      setUserLoggedIn(false)
    }
  }

  const getAllUserReminders = async () => {
    const rems = await ReminderHandler.getAllReminders()

    setReminders(rems)
  }

  LoginHandler.setUserUpdateCallback(updateUser)
  ReminderHandler.setUpdateReminderCallback(getAllUserReminders)


  useEffect(() => {
    updateLoggedInStatus();
  }, [user])

  useEffect(() => {
    if(isUserLoggedIn === true) {
      getAllUserReminders()
    }
  }, [isUserLoggedIn])

  

  return (
    <div className='App' style={{ backgroundImage: `url(${bgImg})` }}>
    <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Router>
        {(isUserLoggedIn===false) ? <Redirect to='/login' /> : null}
          <Switch>
            <Route exact path="/">
              {(!user || user === {})? <Redirect to='/login' />:<Redirect to='/home' />}
            </Route>
            <Route path="/login">
              {(isUserLoggedIn===true)?<Redirect to='/home'/>:null}
              <EntryPage />
            </Route>
            <Route path="/home">
              <HomePage user={user} reminders={reminders} />
            </Route>
            {/* <Route path="/reminders">
              <ReminderHub reminders={reminders} />
            </Route> */}

          </Switch>
      </Router>
    </div>
  );
}

export default App;
