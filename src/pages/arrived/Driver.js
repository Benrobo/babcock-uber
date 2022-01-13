import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StarIcon, PhoneIcon, XCircleIcon } from "@heroicons/react/solid";

import "./style.css";

function Driver({ driverDetails }) {
  console.log(driverDetails);
  if (driverDetails === undefined) {
    // window.location.reload();
  }
  return (
    <div>
      <DriverDetailsBox driverDetails={driverDetails} />
    </div>
  );
}

function DriverDetailsBox({ driverDetails }) {
  return (
    <div className="details-box">
      <div className="top-cont">
        <img
          src={"https://avatars.dicebear.com/api/micah/ben.svg"}
          alt=""
          className="img-fluid"
        />
        <div className="info">
          <p className="name">
            {driverDetails === undefined ? "Undefined" : driverDetails.name}
          </p>
          <span className="trips-count">
            <small>Trips </small>
            120 <StarIcon className="icon" />
          </span>
        </div>
      </div>
      <div className="bottom-cont">
        <div className="left bx">
          <PhoneIcon className="icon" />
          <span>Call Driver</span>
        </div>
        <div className="right bx">
          <XCircleIcon className="icon" />
          <span>Cancel Ride</span>
        </div>
      </div>
    </div>
  );
}

export default Driver;
