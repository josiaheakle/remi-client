import LoginHandler from "../modules/LoginHandler.js"
import { Link } from "react-router-dom"
// import Login from "./Login/Login.js";

import '../styles/HomePage.css'

import bgImg from "../media/coffee-and-map.jpg"
import ReminderHandler from "../modules/ReminderHandler.js"

const HomePage = ( props ) => {

    

    return(
        <div className="HomePage">

            <div className='Navbar'>
                <h2>
                    {(props.user !== undefined) ? props.user.username : 'user'}
                </h2>
            </div>

            <Link to='/reminders' > Reminders </Link>
            
            <button onClick={LoginHandler.logoutUser} > Logout </button>
        </div>
    );
}

export default HomePage;