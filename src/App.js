import React from 'react'
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom"


import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import './App.css';
import Ride from './pages/ride/Ride';
import Request from './pages/request/Request';
import Passenger from './pages/arrived/Passenger';
import Driver from './pages/arrived/Driver';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/student/ride/:id" element={<Ride />} />
          <Route path="/driver/request/:userId" element={<Request />} />
          <Route path="/arrived/passenger/:id" element={ <Passenger /> } />
          <Route path="/arrived/driver/:id" element={ <Driver />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
