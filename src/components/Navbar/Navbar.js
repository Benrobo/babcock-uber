import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import DataContext from "../../context/DataContext";

import "./style.css";

function Navbar() {
  const { logout, locData } = useContext(DataContext);
  const [show, setShow] = useState(false);

  const { id } = locData;

  return (
    <>
      <div className="navbar-cont">
        <div className="logo">Logo</div>
        <div className="right">
          <img
            src="https://avatars.dicebear.com/api/micah/ben.svg"
            alt=""
            onClick={() => setShow(!show)}
            className="user-img img-fluid"
          />
          {show && (
            <div className="more-info">
              <Link to={`/profile/${id}`}>Home</Link>
              <Link to={`/student/ride/${id}`}>Request Ride</Link>
              <p
                to=""
                className="logout"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
