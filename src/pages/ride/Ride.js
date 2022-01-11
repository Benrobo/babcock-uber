import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Head from "../../components/MainHead/Head";
import {
  CheckCircleIcon,
  LocationMarkerIcon,
  XIcon,
} from "@heroicons/react/solid";
import "./style.css";
import { SuccessBtn } from "../../helpers/buttons";
import Modal from "../../components/Modal/Modal";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import cabImg from "../../assets/img/driver.png";
import axios from "axios";
import { Util, Notification } from "../../helpers/util";
import Request from "../request/Request";
import socket from "../../sockets";

const util = new Util();
const notif = new Notification();

let locations = [
  "Babcock Guest house",
  "Main Gate",
  "Winslow Hall",
  "Neal Wilson Hall",
  "Bethel Hall",
  "Samuel Akande Hall",
  "Nelson Mandela Hall",
  "Queen Esther Hall",
  "Nyberg Hall",
  "FAD Hall",
  "White Hall",
  "Havilah Hall",
  "Welch Hall",
  "Crystal Hall",
  "Platinum Hall",
  "Babcock Stadium",
  "Busa House",
  "SAT",
  "New Horizon",
  "EAH",
  "BBS",
  "Babcock super store",
  "Buth",
  "Farm House",
  "Amphitheater",
  "Ogden Hall",
  "Entrepreneurship center",
  "Gideon Hall",
  "Cafeteria",
  "Adeleke hall",
  "Marigold Hall",
];

function Ride() {
  let params = useParams();
  const local = util.getLocalstorageData();

  if (
    params.id !== local.id ||
    !local ||
    local === undefined ||
    local === null
  ) {
    util.redirect("/notfound/" + params.id, 0);
  }

  return (
    <>
      <Navbar />

      {local.role === "student" ? (
        <StudentRideRequestForm />
      ) : (
        <DriverRidePage />
      )}
    </>
  );
}

function StudentRideRequestForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [suggestPickupHide, setPickupSuggestHide] = useState(false);
  const [suggestDropHide, setDropSuggestHide] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [checkAction, setAction] = useState("");
  const [getridedata, setGetrideData] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  let params = useParams();
  const local = util.getLocalstorageData();

  if (
    params.id !== local.id ||
    !local ||
    local === undefined ||
    local === null
  ) {
    util.redirect("/notfound/" + params.id, 0);
  }

  function handleGetRide() {
    if (drop === "" || pickup === "") {
      return notif.error("Fields cant be empty");
    }
    // setGetrideData(locationData);
    setLoading(true);

    // handle ride request
    let sendData = {
      from: pickup,
      to: drop,
      userId: local.id,
      role: local.role,
    };

    socket.emit("student_ride_request", sendData);
  }

  // listen for socket event
  socket.on("available-driver", (data) => {
    console.log(data);
  });

  function searchLocations(text) {
    if (checkAction === "pickup") setPickupSuggestHide(true);
    if (checkAction === "drop") setDropSuggestHide(true);

    let matches = locations.filter((loc) => {
      let regexp = new RegExp(text, "gi");
      return loc.toLocaleUpperCase().match(regexp);
    });

    setSuggestions([...matches]);
  }
  return (
    <div className="ride-cont">
      <div className="form">
        <div className="head mb-4">
          <Link to="/">
            <ArrowLeftIcon className="icon" />
          </Link>
          <h3>Get a Ride</h3>
        </div>
        <div className="pickup-box box">
          <CheckCircleIcon className="icon check" />
          <input
            type="text"
            placeholder="Pickup location"
            className="pickup inp"
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              searchLocations(e.target.value);
              setAction("pickup");
            }}
          />
        </div>
        {suggestPickupHide && (
          <Suggestions
            locations={suggestions}
            select={setPickup}
            setSuggestions={setSuggestions}
            setAction={setAction}
            action={checkAction}
            setPickupSuggestHide={setPickupSuggestHide}
          />
        )}
        <div className="drop-box box">
          <LocationMarkerIcon className="icon location" />
          <input
            type="text"
            placeholder="Drop location"
            className="drop inp"
            value={drop}
            onChange={(e) => {
              setDrop(e.target.value);
              searchLocations(e.target.value);
              setAction("drop");
            }}
          />
        </div>
        {suggestDropHide && (
          <Suggestions
            locations={suggestions}
            select={setDrop}
            setSuggestions={setSuggestions}
            setAction={setAction}
            action={checkAction}
            setDropSuggestHide={setDropSuggestHide}
          />
        )}
        <br />
        {loading && (
          <Modal>
            <div className="finding-driver">
              <div className="img-cont">
                <img src={cabImg} alt="" className="driver-lookup img-fluid" />
              </div>
              <XIcon
                className="icon"
                onClick={() => {
                  setLoading(false);
                  setGetrideData(null);
                  notif.error("ride was cancel");
                }}
              />
            </div>
          </Modal>
        )}
        <SuccessBtn
          text="Get a Ride"
          className="btn submit-btn"
          onClick={handleGetRide}
        />
      </div>
    </div>
  );
}

function DriverRidePage() {
  const [loading, setLoading] = useState(false);
  const [request, setReqest] = useState(false);
  const [error, setError] = useState("");
  const [studentInfo, setStudentId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [role, setRole] = useState("");
  const [userimg, setImg] = useState("");
  const [userId, setUserId] = useState("");

  const maxTime = 20;

  // listen for socket event
  socket.on("users-request", (data) => {
    if (data) {
      console.log(data);
      const { from, to } = data.clientData;
      const { img } = data.user;
      setReqest(true);
      setFrom(from);
      setTo(to);
      setImg(img);
    }
  });

  return (
    <>
      {request === true ? (
        <Request from={from} to={to} image={userimg} />
      ) : (
        <div className="m-3 p-2">
          <p>Driver Page</p>
          <h5>Student Request would show here.</h5>
        </div>
      )}
    </>
  );
}

function Suggestions({
  locations,
  select,
  setSuggestions,
  setAction,
  setDropSuggestHide,
  setPickupSuggestHide,
  action,
}) {
  function handleSelect(text) {
    select(text);
  }
  return (
    <div className={"sugest-cont"}>
      {locations.length > 0 &&
        locations.map((text, i) => (
          <li
            key={i}
            onClick={() => {
              handleSelect(text);
              setSuggestions([]);
              action === "pickup"
                ? setPickupSuggestHide(false)
                : setDropSuggestHide(false);
              setAction("");
            }}
          >
            {text}
          </li>
        ))}
    </div>
  );
}

export default Ride;
