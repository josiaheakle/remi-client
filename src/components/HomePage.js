import LoginHandler from "../modules/LoginHandler.js"
import Login from "./Login/Login.js";

const HomePage = ( props ) => {

    

    return(
        <div className="HomePage">
            <h1> Hello, {(props.user !== undefined) ? props.user.username : 'user'} </h1>
            <button onClick={LoginHandler.logoutUser} > Logout </button>
        </div>
    );
}

export default HomePage;