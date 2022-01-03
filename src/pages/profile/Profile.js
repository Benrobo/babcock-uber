import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Switch from "react-input-switch";
import "./style.css";
import { Link } from "react-router-dom";
import mapImg from "../../assets/img/map-bg.png";
import Head from "../../components/MainHead/Head";
import { Util, Notification } from "../../helpers/util";

import DataContext from "../../context/DataContext";

const util = new Util();
const notyf = new Notification();
const local = util.getLocalstorageData();

// if an error is present when getting data from this util function
// redirect the user back to sigin

if (local.error) {
  util.redirect("/signin", 0);
}

function Profile() {
  const context = useContext(DataContext);
  // check if the /profile/:id is valid
  const params = useParams();
  const local = util.getLocalstorageData();

  console.log(context);

  if (
    params.id !== local.id ||
    !local ||
    local === undefined ||
    local === null
  ) {
    return util.redirect("/signin", 0);
  }

  return (
    <>
      <Navbar />
      <div className="profile-cont">
        <Head text="Profile" />
        <UserInfoHead userInfo={"dfbv"} />
        <StatReview />
        <UserProfileDetails />
        {/* <UserTrips /> */}
        <div className="space"></div>
      </div>
    </>
  );
}

// top head container

function UserInfoHead() {
  const [switchVal, setSwitchVal] = useState(0);
  const [switchState, setSwitchState] = useState(true);

  return (
    <div className="user-info-head">
      <img
        src="https://avatars.dicebear.com/api/micah/ben.svg"
        alt=""
        className="user-img img-fluid"
      />
      <div className="info">
        <h3>John Doe</h3>
        <div className="m-info">
          <span className="info-txt">
            {local.role === "student" ? (
              "student"
            ) : (
              <>
                <span className="mr-2">Driver</span>
                <Switch
                  value={switchState ? 1 : 0}
                  onChange={(e) => setSwitchState(!switchState)}
                  styles={{
                    track: {
                      backgroundColor: "#777",
                    },
                    trackChecked: {
                      backgroundColor: "#4ac074",
                    },
                    button: {
                      backgroundColor: "#272727",
                    },
                    buttonChecked: {
                      backgroundColor: "green",
                    },
                  }}
                />
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatReview() {
  return (
    <>
      {/* <p>Stat</p> */}
      <br />
      <div className="stat-cont">
        <div className="box">
          <div className="text">Accepted Trips</div>
          <div className="count">23</div>
        </div>
        <div className="box">
          <div className="text">Rejected Trips</div>
          <div className="count">3</div>
        </div>
      </div>
    </>
  );
}

function UserProfileDetails() {
  return (
    <div className="details-cont">
      <li>
        <span className="grey">name</span>
        <span className="detail-txt">John Doe</span>
      </li>
      <li>
        <span className="grey">email</span>
        <span className="detail-txt">test@gmail.com</span>
      </li>
      <li>
        <span className="grey">matric number</span>
        <span className="detail-txt">334c587</span>
      </li>
      <li>
        <span className="grey">Place Number</span>
        <span className="detail-txt">RGB76GH</span>
      </li>
      <li>
        <span className="grey">password</span>
        <span className="detail-txt">******</span>
      </li>

      <button className="edit-btn btn">Edit Profile</button>
    </div>
  );
}

function UserTrips() {
  return (
    <>
      <h3>Your Trips</h3>
      <div className="trips-cont">
        <div className="trips">
          <img src={mapImg} alt="" className="img-fluid" />
          <div className="trip-info">
            <p className="location">
              <small>From</small>: Location Here
            </p>
            <span className="time">Mon 22, 2020 4:00pm</span>
          </div>
        </div>
        <div className="trips">
          <img src={mapImg} alt="" className="img-fluid" />
          <div className="trip-info">
            <p className="location">
              <small>From</small>: Location Here
            </p>
            <span className="time">Mon 22, 2020 4:00pm</span>
          </div>
        </div>
        <div className="trips">
          <img src={mapImg} alt="" className="img-fluid" />
          <div className="trip-info">
            <p className="location">
              <small>From</small>: Location Here
            </p>
            <span className="time">Mon 22, 2020 4:00pm</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
