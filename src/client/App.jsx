//App.jsx
import React from 'react';
import Navbar from "../components/NavBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Signup from "../components/signUp";
import Login from "../components/login";
import Home from "../components/Home";
import Mens from "../components/mens";
import Womens from "../components/womens";
import AllWatches from '../components/AllWatches';
import SingleWatch from '../components/SingleWatch';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/watches" element={<AllWatches />} />
          <Route path="/watches/:id" element={<SingleWatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

