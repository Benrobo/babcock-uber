import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ArrowLeftIcon } from "@heroicons/react/solid";

import { SuccessBtn } from "../../helpers/buttons";
import "./style.css";

import { Notification, Util, Http } from "../../helpers/util";

// instance
const notif = new Notification(5000);
const util = new Util();
const http = new Http();

function Signup() {
  const [tab, setTab] = useState("student");
  const [tabState, setTabState] = useState(true);
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [matricnumber, setMatricnumber] = useState("");
  const [platenumber, setPlatenumber] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    // validate input
    if (fullname === "" || phonenumber === "" || password === "") {
      return notif.error("all fields are required");
    }

    // validate email
    if (!util.validateEmail(mail)) {
      return notif.error("email is invalid");
    }

    // validate phonenumber
    if (!util.validatePhonenumber(phonenumber)) {
      return notif.error("Invalid phonenumber: eg 07056448763");
    }

    // validate matric number
    if (tab === "student" && !util.validateMatricNumber(matricnumber)) {
      return notif.error("Invalid matric number: eg 18/0032");
    }

    // validate plate number
    if (tab === "driver" && !util.validatePlaneNumber(platenumber)) {
      return notif.error("license platenumber is invalid: eg AAA-553");
    }

    // else if every condition was met
    // make request to server
    const userData = {};

    if (tab === "student") {
      userData["name"] = fullname;
      userData["email"] = mail;
      userData["role"] = tab;
      userData["phoneNumber"] = phonenumber;
      userData["matricNumber"] = matricnumber;
      userData["password"] = password;
    }

    if (tab === "driver") {
      userData["name"] = fullname;
      userData["email"] = mail;
      userData["role"] = tab;
      userData["phoneNumber"] = phonenumber;
      userData["plateNumber"] = platenumber;
      userData["password"] = password;
    }

    console.log(userData);
    const url = "http://localhost:5000/api/auth/register";
    http.post(
      url,
      userData,
      {
        "content-type": "application/json",
      },
      (data) => {
        const { req, res } = data;

        if (req.status === 200) {
          notif.success(res.msg);
          util.redirect("/signin", 2000);
          return;
        }
        notif.error(res.msg);
      }
    );
  }

  return (
    <>
      <div className="auth-cont">
        <div className="head mb-4">
          <Link to="/">
            <ArrowLeftIcon className="icon" />
          </Link>
          <h3>Create an Account</h3>
        </div>
        <div className="form-container mt-2">
          <div className="tab">
            <div className="box l">
              <input
                type="radio"
                name="1"
                value="student"
                checked={tabState}
                onClick={(e) => {
                  setTab(e.target.value);
                  setTabState(!tabState);
                }}
                className="radio"
              />
              <label htmlFor="">Students</label>
            </div>
            <div className="box r">
              <input
                type="radio"
                name="1"
                value="driver"
                onClick={(e) => {
                  setTab(e.target.value);
                  setTabState(!tabState);
                }}
                className="radio"
              />
              <label htmlFor="">Driver</label>
            </div>
          </div>
          <br />

          <div className="user-form form">
            <input
              type="text"
              placeholder="Full Name"
              maxLength="20"
              className="input"
              autoFocus
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
            <input
              type="tel"
              placeholder="Phonenumber"
              className="input"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              maxLength="11"
              required
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder={
                tab === "student" ? "Matric Number" : "License Plate Number"
              }
              className="input"
              maxLength="9"
              onChange={(e) => {
                tab === "student"
                  ? setMatricnumber(e.target.value)
                  : setPlatenumber(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              maxLength="20"
              className="input mb-2"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <SuccessBtn
              text="Create Account"
              onClick={handleClick}
              className={"btn-block"}
            />
            <small>
              have an account? <Link to="/signin">Sign In</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
