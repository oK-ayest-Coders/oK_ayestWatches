//login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../client/index.css';

function Login() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };
    return (
      <div className="loginContainer2">
<div className = "form-box">
<h1>Sign up</h1>
<form>
    <div className = "input-group">
        <div className = "input-field">
            <input type = "text" placeholder = "Name"></input>
        </div>
        <div className = "input-field">
        <input type = "email" placeholder = "Email"></input>
        </div>
        <div className = "input-field">
        <input type = "username" placeholder = "Username"></input>
        </div>
        <div className = "input-field">
        <input type = "password" placeholder = "Password"></input>
        </div>
        <div className = "button-field">
            <button type = "button" className = "disable"onClick={handleLoginClick}>Log In</button>
            <button type = "button" >Sign Up</button>

        </div>
    </div>
</form>
</div>

      </div>

    );
  }
  
  export default Login;