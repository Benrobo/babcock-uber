import React from "react";
import { StarIcon, PhoneIcon, XCircleIcon } from "@heroicons/react/solid";

import "./style.css";
import socket from "../../sockets";

function Student({
  studentDetails,
  droplocation,
  setStudentCard,
  setCancelRideMsg,
  studentSocketId,
}) {
  return (
    <div>
      <DriverDetailsBox
        studentDetails={studentDetails}
        droplocation={droplocation}
        setStudentCard={setStudentCard}
        setCancelRideMsg={setCancelRideMsg}
        studentSocketId={studentSocketId}
      />
    </div>
  );
}

function DriverDetailsBox({
  studentDetails,
  droplocation,
  setStudentCard,
  setCancelRideMsg,
  studentSocketId,
}) {
  function cancelRequest() {
    // emit event to server
    socket.emit("ride-cancel", {
      msg: "ride was cancel",
      id: studentSocketId,
    });
    setStudentCard(false);
    setCancelRideMsg("Ride canceled");
  }

  return (
    <>
      {studentDetails !== undefined
        ? studentDetails.map((data, i) => {
            return (
              <div className="driver-ride-cont" key={data.usersIdentifier}>
                <div className="details-box">
                  <div className="top-cont">
                    <img src={data.phoneNumber} alt="" className="img-fluid" />
                    <div className="info">
                      <p className="name">{data.name}</p>
                      <div className="location-info">
                        <small>Drop Location</small>
                        <p>{droplocation}</p>
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
                      <a href={`tel:+${data.phoneNumber}`}>
                        <span>Call Student</span>
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-danger ride-status"
                  onClick={() => {
                    cancelRequest();
                  }}
                >
                  Cancel Ride
                </button>
              </div>
            );
          })
        : ""}
    </>
  );
}

export default Student;
