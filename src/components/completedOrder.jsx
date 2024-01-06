import React from 'react';
import { useNavigate } from 'react-router-dom';

function Complete() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/watches'); 
  };
  const handleLogout = () => {
//create a log out function
    navigate('/login'); 
  };
  return (
    
      <div className="loginContainer2">
      <div className="form-box">
          <h1>OK'AYEST WATCHES</h1>
          <p>Congratulations! Your order is being processed.</p>
      <p>Your payment is in progress.</p>
      <button onClick={handleBackToHome}>Back to Home</button>
      <button onClick={handleLogout}>Logout</button>
      </div>
  </div>
  );
}

export default Complete;
