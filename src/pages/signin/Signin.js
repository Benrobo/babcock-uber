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

function Signin() {
  const [tab, setTab] = useState("student");
  const [tabState, setTabState] = useState(true);
  const [phonenumber, setPhonenumber] = useState("");
  const [matricnumber, setMatricnumber] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    // validate input
    if ((phonenumber === "" || password === "") && tab === "driver") {
      setPhonenumber("");
      return notif.error("phonenumber required");
    }

    if ((matricnumber === "" || password === "") && tab === "student") {
      setMatricnumber("");
      return notif.error("matric number is required");
    }

    // validate phonenumber
    if (!util.validatePhonenumber(phonenumber) && tab === "driver") {
      return notif.error("Invalid phonenumber: eg 07056448763");
    }

    // validate matric number
    if (tab === "student" && !util.validateMatricNumber(matricnumber)) {
      return notif.error("Invalid matric number: eg 18/0032");
    }

    // else if every condition was met
    // make request to server
    const userData = {};

    if (tab === "student") {
      userData["role"] = tab;
      userData["matricNumber"] = matricnumber;
      userData["password"] = password;
    }

    if (tab === "driver") {
      userData["role"] = tab;
      userData["phoneNumber"] = phonenumber;
      userData["password"] = password;
    }

    const url = "http://localhost:5000/api/auth/login";
    http.post(
      url,
      userData,
      {
        "content-type": "application/json",
      },
      (data) => {
        const { req, res } = data;

        if (req.status === 200) {
          notif.success("Succesfully loggedIn");
          // decode token
          const { accessToken, refreshToken } = res;
          if (
            util.decodeJwt(refreshToken).error ||
            util.decodeJwt(refreshToken).msg
          ) {
            notif.error(util.decodeJwt(refreshToken));
            return Error(util.decodeJwt(refreshToken).msg);
          }
          const { id, role } = util.decodeJwt(refreshToken);
          const saveuserInfo = {
            id,
            role,
            accessToken,
            refreshToken,
          };
          // save data to localstorage
          util.saveLocalstorage(saveuserInfo);
          util.redirect(`/profile/${id}`, 1500);
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
          <h3>Sign In</h3>
        </div>
        <div className="form-container mt-2">
          <div className="tab">
            <div className="box l">
              <input
                type="radio"
                name="1"
                value="student"
                defaultChecked={tabState}
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
              type={tab === "student" ? "text" : "tel"}
              placeholder={tab === "student" ? "Matric Number" : "Phone Number"}
              className="input"
              maxLength={tab === "student" ? "9" : "11"}
              pattern={tab === "student" ? "" : "[0-9]{3}-[0-9]{3}-[0-9]{4}"}
              required
              onChange={(e) => {
                tab === "student"
                  ? setMatricnumber(e.target.value)
                  : setPhonenumber(e.target.value);
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
              have an account? <Link to="/signup">Sign In</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
