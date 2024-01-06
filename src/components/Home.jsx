//Home.jsx
/*Default home page that will get worked on later.
just made it so i can have changes when i clicked around.JP*/

import React from 'react';
import '../client/index.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/watches'); 
  };

  return (
    <div className="homeText" onClick={handleClick}>
            <p>Welcome to </p>

      <h1>OK'AYEST WATCHES</h1>
      <p>Where luxury and affordability meets</p>
    </div>
  );
}

export default Home;
