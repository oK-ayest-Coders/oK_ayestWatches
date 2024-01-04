//login.jsx
// import react library and use Dom used for navigation as well as styling
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../client/index.css';

//create a function for login

function Login() {
    //make a state variable for username and password using usestate cause it can be changed 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // make a hook for navigation between different pages
    const navigate = useNavigate();
    //create the login in form submission. for when the login button is clicked
    const handleLogin = async (e) => {
        e.preventDefault(); 
        // take the login and passwort and try to login with away fetch
        try { 
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                navigate('/');

            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
//create a navigation to go to signup page when clicked
    const handleSignUpClick = () => {
        navigate('/signup'); // 
    };
// return everything that the user will actually see
    return (
        <div className="loginContainer">
            <div className="form-box">
                <h1>Log In</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <div className="input-field">
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="button-field">
                            <button type="submit">Log In</button>
                            <button type="button" className="disable" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
