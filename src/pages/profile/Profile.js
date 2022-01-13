import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Switch from "react-input-switch";
import "./style.css";
import { Link } from "react-router-dom";
import mapImg from "../../assets/img/map-bg.png";
import Head from "../../components/MainHead/Head";
import { Util, Notification } from "../../helpers/util";
import { UserIcon } from "@heroicons/react/solid";
import axios from "axios";
import DataContext from "../../context/DataContext";
import socket from "../../sockets";
import Request from "../request/Request";
import Student from "../arrived/Student";

const util = new Util();
const notif = new Notification(3000);
const local = util.getLocalstorageData();

// if an error is present when getting data from this util function
// redirect the user back to sigin

if (local.error) {
  util.redirect("/signin", 0);
}

function Profile() {
  // const { error, authUserInfo, loading } = useContext(DataContext);
  const [authUserInfo, setAuthUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [request, setReqest] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState(false);
  const [userimg, setImg] = useState("");
  const [socketid, setSocketId] = useState("");
  const [incomingStudentId, setIncomingStudentId] = useState("");
  const [incomingStudentRole, setIncomingStudentRole] = useState("");
  const [showstudentcard, setStudentCard] = useState(false);
  const [studentMainDetails, setStudentMainDetails] = useState([]);
  const params = useParams();
  const local = util.getLocalstorageData();

  if (
    params.id !== local.id ||
    !local ||
    local === undefined ||
    local === null
  ) {
    util.redirect("/notfound/" + params.id, 0);
  }

  // get current socketid
  let currentSocketid = JSON.parse(localStorage.getItem("socket"));

  // listen for socket event
  // as long as the driver status is online, then recieve the socket request

  useEffect(() => {
    if (status) {
      socket.on("users-request", (data) => {
        if (data) {
          console.log(data);
          const { from, to, socketId } = data.clientData;
          const { img, id, role } = data.user;
          setReqest(true);
          setFrom(from);
          setTo(to);
          setImg(img);
          setSocketId(socketId);
          setIncomingStudentId(id);
          setIncomingStudentRole(role);
        }
      });
    }
  }, [status, setStatus]);

  const sendData = {
    userId: local.id,
    role: local.role,
  };

  useEffect(() => {
    try {
      axios
        .post("http://localhost:5000/api/users", sendData)
        .then((res) => {
          setLoading(false);
          setAuthUserInfo([res.data]);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    } catch (err) {
      setLoading(false);
      setError("Something went wrong fetching users data.: " + err.message);
    }
  }, []);

  function cancelRequest() {
    // emit event to server
    socket.emit("ride-cancel", { msg: "ride was cancel", id: socketid });
    setReqest(false);
  }

  async function acceptRequest() {
    socket.emit("ride-accepted", {
      studentSocketId: socketid,
      driverSocketId: currentSocketid.socketid,
      studentId: incomingStudentId,
      driverId: local.id,
      driverRole: local.role,
    });
    setReqest(false);
    setStudentCard(true);

    // fetch student data
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/users";
      let req = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: incomingStudentId,
          role: incomingStudentRole,
        }),
      });
      let res = await req.json();
      console.log(res);
      if (req.status === 200 || req.status === 201) {
        setStudentMainDetails([res]);
        setLoading(false);
        return;
      }

      setLoading(false);
      setStudentCard(false);
      notif.error(`accepting ride failed: ${res.msg}`);
    } catch (err) {
      setLoading(false);
      setStudentCard(false);
      notif.error(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="profile-cont">
        {loading === true ? (
          "loading ..."
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <Head text="Profile" />
            <UserInfoHead
              userInfo={authUserInfo}
              loadingState={loading}
              status={status}
              setStatus={setStatus}
            />
            <StatReview />
            <UserProfileDetails
              userInfo={authUserInfo}
              loadingState={loading}
              localInfo={local}
            />
            {request && (
              <div className="request-modal">
                <Request
                  from={from}
                  to={to}
                  image={userimg}
                  socketId={socketid}
                  cancelRequest={cancelRequest}
                  acceptRequest={acceptRequest}
                  setReqest={setReqest}
                  driverInfo={authUserInfo}
                />
              </div>
            )}
            {/* <UserTrips /> */}
            {showstudentcard && (
              <div className="student-modal">
                <Student
                  studentDetails={studentMainDetails}
                  droplocation={to}
                />
              </div>
            )}
            <div className="space"></div>
          </>
        )}
      </div>
    </>
  );
}

// top head container

function UserInfoHead({ userInfo, loadingState, status, setStatus }) {
  const local = util.getLocalstorageData();

  return loadingState === true ? (
    "loading ..."
  ) : (
    <>
      <div className="user-info-head">
        {navigator.onLine ? (
          <img
            src={userInfo[0] === undefined ? "" : userInfo[0].profilePics}
            alt={"img"}
            className="user-img img-fluid mr-4"
          />
        ) : (
          <UserIcon className="user-icon" />
        )}
        <div className="info">
          <h3>{userInfo[0] === undefined ? "" : userInfo[0].name}</h3>
          <div className="m-info">
            <span className="info-txt">
              {local.role === "student" ? (
                "student"
              ) : (
                <>
                  <span className="mr-2">Driver</span>
                  <Switch
                    value={status ? 1 : 0}
                    onChange={(e) => {
                      setStatus(!status);
                    }}
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
    </>
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

function UserProfileDetails({ userInfo, loadingState, localInfo }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="details-cont">
      <li>
        <span className="grey">name</span>
        <span className="detail-txt">
          {userInfo[0] === undefined ? "null" : userInfo[0].name}
        </span>
      </li>
      <li>
        <span className="grey">email</span>
        <span className="detail-txt">
          {userInfo[0] === undefined ? "null" : userInfo[0].mail}
        </span>
      </li>
      <li>
        <span className="grey">
          {localInfo.role === "student" ? "matric number" : "plate number"}
        </span>
        <span className="detail-txt">
          {userInfo[0] === undefined
            ? "null"
            : userInfo[0].usersIdentifier.split("-")[1]}
        </span>
      </li>
      <li>
        <span className="grey">Phonenumber</span>
        <span className="detail-txt">
          {userInfo[0] === undefined ? "null" : userInfo[0].phoneNumber}
        </span>
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
