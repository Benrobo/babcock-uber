import React, { useState } from "react";
// import { useParams } from 'react-router'
import { Link } from "react-router-dom";
import LocationBox from "../../components/LocationBox/LocationBox";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Head from "../../components/MainHead/Head";
import "./style.css";
import Navbar from "../../components/Navbar/Navbar";

import axios from "axios";
import { Util, Notification } from "../../helpers/util";
import socket from "../../sockets";
import Timer from "../../components/Timer/Timer";
const util = new Util();
const notif = new Notification();

function Request({ from, to, image }) {
  let local = util.getLocalstorageData();

  function cancelRequest() {
    console.log(local);
    // socket.emit("ride-cancel", data)
  }

  function acceptRequest() {
    console.log(local);
    // socket.emit("ride-cancel", data)
  }

  return (
    <>
      <div className="request-cont">
        <div className="head mb-4">
          <Link to="/">
            <ArrowLeftIcon className="icon" />
          </Link>
          <h3>Ride Request</h3>
        </div>
        <LocationBox from={from} to={to} />

        <br />
        <div className="request-info">
          <img src={image} alt="" className="img-fluid" />
          <br />
          <br />
          <br />
          <Timer sec={20} />
          <br />
          <div className="actions-btn">
            <button className="accept btn" onClick={acceptRequest}>
              Accept
            </button>
            <button className="reject btn" onClick={cancelRequest}>
              Reject
            </button>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export default Request;
