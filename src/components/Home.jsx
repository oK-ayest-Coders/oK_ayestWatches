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
      <h1>OK'AYEST WATCHES</h1>
      <p>UNDER CONSTRUCTION</p>
    </div>
  );
}

export default Home;
