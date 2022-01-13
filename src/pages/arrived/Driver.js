import React from "react";
import { StarIcon, PhoneIcon, XCircleIcon } from "@heroicons/react/solid";

import "./style.css";
import { Link } from "react-router-dom";

function Driver() {
  return (
    <div>
      <DriverDetailsBox />
    </div>
  );
}

function DriverDetailsBox({ driverDetail }) {
  console.log(driverDetail);
  return (
    <>
      {driverDetail !== undefined
        ? driverDetail[0].map((i, data) => {
            <div className="driver-ride-cont" key={data.usersIdentifier}>
              <div className="details-box">
                <div className="top-cont">
                  <img src={data.phoneNumber} alt="" className="img-fluid" />
                  <div className="info">
                    <p className="name">{data.name}</p>
                    <div className="location-info">
                      <small>Drop Location</small>
                      <p>Austin texas</p>
                    </div>
                  </div>
                </div>
                <div className="bottom-cont">
                  <div className="counter-cont bx">
                    <span className="counter">01 min</span>
                  </div>
                  <div className="left bx">
                    <PhoneIcon className="icon" />
                    {/* <span>Call Driver</span> */}
                    <Link to={`tel: ${data.phoneNumber}`}>Call Driver</Link>
                  </div>
                </div>
              </div>
              <button className="btn btn-danger ride-status">
                Cancel Ride
              </button>
            </div>;
          })
        : ""}
    </>
  );
}

export default Driver;
