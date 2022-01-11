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

const util = new Util();
const notif = new Notification();

function Request({ from, to, image }) {
  const maxTime = 20;
  const endTime = 0;

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
          <div className="timer-cont">11:05</div>
          <br />
          <div className="actions-btn">
            <button className="accept btn">Accept</button>
            <button className="reject btn">Reject</button>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

export default Request;
