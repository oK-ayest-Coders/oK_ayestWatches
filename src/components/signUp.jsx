//signUp.jsx
import { useNavigate } from 'react-router-dom';
import '../client/index.css';
import React, { useState } from 'react';

// make variables that can be changed "usestate"
function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //create navigation for button to go back to login 
    const handleSignUpClick = () => {
        navigate('/login');
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        // make the try post to send username and password to the server

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, username, password }),
            });
            //check if user information went through or not
            if (response.status === 201) {
                // Registration was successful, redirect to login page
                navigate('/login');
            } else {
                // Handle registration failure
                console.error('Signup error:', response.statusText);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };
    // make a return that will show everthing that is displayed for the user
    return (
        <div className="loginContainer2">
            <div className="form-box">
                <h1>Sign up</h1>
                <form onSubmit={handleSignUp}>
                    <div className="input-group">
                        <div className="input-field">
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="button-field">
                            <button type="button" className="disable" onClick={handleSignUpClick}>Login</button>
                            <button type="submit">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;