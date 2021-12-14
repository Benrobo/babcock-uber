import React from 'react'
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom"


import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
