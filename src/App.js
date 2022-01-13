import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import "./App.css";
import Ride from "./pages/ride/Ride";
import Request from "./pages/request/Request";
import { DataContextProvider } from "./context/DataContext";
import Notfound from "./pages/notfound/Notfound";

import { Util } from "./helpers/util";

const util = new Util();

function App() {
  return (
    // <div className="App">
    <DataContextProvider>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={util.isLoggedIn() === true ? <Home /> : <Signup />}
            />
            <Route
              path="/signin"
              element={util.isLoggedIn() === true ? <Home /> : <Signin />}
            />
            <Route
              path="/profile/:id"
              element={util.isLoggedIn() === true ? <Profile /> : <Signup />}
            />
            <Route
              path="/users/ride/:id"
              element={util.isLoggedIn() === true ? <Ride /> : <Signup />}
            />
            <Route path="/notfound/:pageId" element={<Notfound />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Router>
      </>
    </DataContextProvider>
    // </div>
  );
}

export default App;
