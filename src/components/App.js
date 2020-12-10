
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import EntryPage from "./Login/EntryPage.js"
import HomePage from "./HomePage.js"

import LoginHandler from "../modules/LoginHandler.js"

import '../styles/App.css';

const App = () => {

  const [ user, setUser ] = useState(undefined);
  const [ isUserLoggedIn, setUserLoggedIn ] = useState(false);

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

  LoginHandler.setUserUpdateCallback(updateUser)

  useEffect(() => {
    updateLoggedInStatus();
  }, [user])

  return (
    <Router>
      {(isUserLoggedIn===false) ? <Redirect to='/login' /> : null}
      <div className="App">
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

        </Switch>
      </div>
    </Router>

  );
}

export default App;
