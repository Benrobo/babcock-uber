import React from 'react'
import {
  BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom"


import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
