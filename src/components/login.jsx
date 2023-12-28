//login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../client/index.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('/api/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
               
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // 
    };

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
