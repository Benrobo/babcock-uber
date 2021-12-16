import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Head from "../../components/MainHead/Head";
import { CheckCircleIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import "./style.css";
import { SuccessBtn } from "../../helpers/buttons";
import Modal from "../../components/Modal/Modal";

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
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [suggestPickupHide, setPickupSuggestHide] = useState(false);
  const [suggestDropHide, setDropSuggestHide] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [checkAction, setAction] = useState("");

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
    <>
      <Navbar />
      <div className="ride-cont">
        <div className="form">
          <Head text="Get a Ride" />
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
          <Modal>
              <div className="container">
                    {/* finding driver */}
                    
                    {/* driver request */}
              </div>
          </Modal>
          {/* modal box */}
          {/* <button className="btn submit btn-block">Get a Ride</button> */}
          <SuccessBtn text="Get a Ride" className="btn submit-btn" />
        </div>
      </div>
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
