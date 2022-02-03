import React, { useState, useEffect } from "react";
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
import { Util, Notification } from "../../helpers/util";
import socket from "../../sockets";
import Driver from "../arrived/Driver";
import axios from "axios";
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
  const [driverInfo, setDriverInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (
    params.id !== local.id ||
    !local ||
    local === undefined ||
    local === null ||
    local.role !== "student"
  ) {
    util.redirect("/notfound/" + params.id, 0);
  }

  useEffect(() => {
    async function getDriverDetails() {
      try {
        setLoading(true);
        const url = "http://localhost:5000/api/users";
        let req = await fetch(url, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userId: local.id, role: local.role }),
        });

        let res = await req.json();

        if (req.status === 200 || req.status === 201) {
          setLoading(false);
          setDriverInfo([res]);
          setError(null);
          return;
        }
        setLoading(false);
        setDriverInfo(null);
        setError(res.msg);
        notif.error(res.msg);
      } catch (err) {
        notif.error(err.message);
        setLoading(false);
        setDriverInfo(null);
        setError(err.message);
      }
    }
    getDriverDetails();
  }, []);

  return (
    <>
      <Navbar />

      {local.role === "student" && (
        <StudentRideRequestForm driverDetail={driverInfo} />
      )}
    </>
  );
}

function StudentRideRequestForm({ driverDetail }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [suggestPickupHide, setPickupSuggestHide] = useState(false);
  const [suggestDropHide, setDropSuggestHide] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [checkAction, setAction] = useState("");
  const [cancelridemsg, setCancelRideMsg] = useState("");
  const [rideStatus, setRideStatus] = useState(false);
  // const [getridedata, setGetrideData] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [incomingDriverDetails, setIncomingDriverDetails] = useState(null);
  const [ridestate, setRideState] = useState(false);
  const [rideloading, setRideLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  let params = useParams();
  const local = util.getLocalstorageData();

  // get current socketid
  let currentSocketid = JSON.parse(localStorage.getItem("socket"));

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
    setLoading(true);
    setRideState(true);

    // get client socket ID
    if (
      localStorage.getItem("socket") === null ||
      localStorage.getItem("socket") === undefined
    ) {
      // refresh page and get new socketId
      window.location.reload(0);
    }

    let { socketId } = JSON.parse(localStorage.getItem("socket"));

    // handle ride request
    let sendData = {
      from: pickup,
      to: drop,
      userId: local.id,
      role: local.role,
      socketId,
    };

    socket.emit("student_ride_request", sendData);
  }

  useEffect(() => {
    if (cancelridemsg !== "") {
      notif.error(cancelridemsg);
    }
    setTimeout(() => {
      setCancelRideMsg("");
    }, 2000);
  }, [cancelridemsg]);

  // listen for socket event
  // listen for cancel ride event.
  socket.on("ride-cancel", (data) => {
    if (data) {
      setCancelRideMsg(data.msg);
      setRideLoading(false);
      setLoading(false);
    }
  });

  socket.on("no-driver", (data) => {
    if (data) {
      setCancelRideMsg(data.message);
      setRideLoading(false);
      setLoading(false);
    }
  });

  useEffect(() => {
    socket.on("ride-accepted", (data) => {
      if (data) {
        setIncomingDriverDetails({ ...data });
        setLoading(false);
        setRideLoading(true);
      }
    });
  }, [incomingDriverDetails, setIncomingDriverDetails]);

  function cancelRequest() {
    socket.emit("ride-cancel", {
      msg: "ride was cancel",
      id: currentSocketid.socketId,
    });
    setLoading(false);
    setCancelRideMsg("Ride canceled");
  }

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
                  // setGetrideData(null);
                  cancelRequest();
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
      {/* driver modal */}
      {rideloading && (
        <div className="driver-modal">
          <Driver
            incomingDriverDetails={incomingDriverDetails}
            setRideLoading={setRideLoading}
            setCancelRideMsg={setCancelRideMsg}
          />
          ;
        </div>
      )}
    </div>
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
