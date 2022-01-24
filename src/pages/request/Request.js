import React from "react";
import { Link } from "react-router-dom";
import LocationBox from "../../components/LocationBox/LocationBox";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import "./style.css";
import Timer from "../../components/Timer/Timer";

function Request({
  from,
  to,
  image,
  socketId,
  rejectRide,
  acceptRequest,
  setReqest,
}) {
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
          <Timer sec={10} socketId={socketId} setReqest={setReqest} />
          <br />
          <div className="actions-btn">
            <button
              className="accept btn"
              onClick={() => {
                acceptRequest();
              }}
            >
              Accept
            </button>
            <button
              className="reject btn"
              onClick={() => {
                rejectRide();
              }}
            >
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
