import React from "react";
import { StarIcon, PhoneIcon, XCircleIcon } from "@heroicons/react/solid";

import "./style.css";
import { Link } from "react-router-dom";

function Student({ studentDetails, droplocation }) {
  return (
    <div>
      <DriverDetailsBox
        studentDetails={studentDetails}
        droplocation={droplocation}
      />
    </div>
  );
}

function DriverDetailsBox({ studentDetails, droplocation }) {
  console.log(studentDetails);
  return (
    <>
      {studentDetails !== undefined
        ? studentDetails.map((data, i) => {
            console.log(data);
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
                      <Link to={`tel: ${data.phoneNumber}`}>
                        <span>Call Driver</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <button className="btn btn-danger ride-status">
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
