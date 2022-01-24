import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { StarIcon, PhoneIcon, XCircleIcon } from "@heroicons/react/solid";
import socket from "../../sockets";
import "./style.css";

function Driver({ incomingDriverDetails, setRideLoading, setCancelRideMsg }) {
  if (incomingDriverDetails === undefined) {
    window.location.reload();
  }
  return (
    <div>
      <DriverDetailsBox
        driverDetails={incomingDriverDetails}
        setRideLoading={setRideLoading}
        setCancelRideMsg={setCancelRideMsg}
      />
    </div>
  );
}

function DriverDetailsBox({ driverDetails, setRideLoading, setCancelRideMsg }) {
  console.log(driverDetails);

  function cancelRequest() {
    // emit event to server
    socket.emit("ride-cancel", {
      msg: "ride was cancel",
      id: driverDetails.driverSocketId,
    });
    setRideLoading(false);
    setCancelRideMsg("Ride canceled");
  }

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
          <a href={`tel:+${driverDetails.phoneNumber}`}>Call Driver</a>
        </div>
        <div
          className="right bx"
          onClick={() => {
            cancelRequest();
          }}
        >
          <XCircleIcon className="icon" />
          <span
            onClick={() => {
              cancelRequest();
            }}
          >
            Cancel Ride
          </span>
        </div>
      </div>
    </div>
  );
}

export default Driver;
