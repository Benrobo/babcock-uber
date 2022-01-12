import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
import DataContext from "../../context/DataContext";
import socket from "../../sockets";

import "./style.css";

function Navbar() {
  const { logout, locData } = useContext(DataContext);
  const [show, setShow] = useState(false);

  const { id, role } = locData;

  return (
    <>
      <div className="navbar-cont">
        <div className="logo">Logo</div>
        <div className="right">
          {navigator.onLine === true ? (
            <UserIcon
              onClick={() => setShow(!show)}
              className="user-img img-fluid"
            />
          ) : (
            <UserIcon
              onClick={() => setShow(!show)}
              className="user-img img-fluid"
            />
          )}
          {show && (
            <div className="more-info">
              <Link to={`/profile/${id}`}>Home</Link>
              <Link to={`/users/ride/${id}`}>
                {role === "student" ? "Request Ride" : ""}
              </Link>
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
