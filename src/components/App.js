
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import EntryPage from "./Login/EntryPage.js"
import HomePage from "./HomePage.js"
import ReminderHub from "./Reminders/ReminderHub.js"

import bgImg from "../media/coffee-and-map.jpg"

import LoginHandler from "../modules/LoginHandler.js"


import '../styles/App.css';
import ReminderHandler from "../modules/ReminderHandler.js"

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

    console.log(`reminders:`)
    console.log(rems)

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
              <HomePage user={user} />
            </Route>
            <Route path="/reminders">
              <ReminderHub reminders={reminders} />
            </Route>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
