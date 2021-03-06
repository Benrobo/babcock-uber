import React, { useState, useContext } from "react";
import {
  LightningBoltIcon,
  ShieldExclamationIcon,
  XIcon,
} from "@heroicons/react/solid";

import "./style.css";
import { SuccessBtn } from "../../helpers/buttons";
import image from "../../assets/img/car.png";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";

import { Util } from "../../helpers/util";

const util = new Util();

function Home() {
  const { locData } = useContext(DataContext);
  const [isOpen, setIsopen] = useState(false);

  return (
    <>
      {isOpen && (
        <Modal>
          <div className="info-cont">
            <XIcon className="icon" onClick={() => setIsopen(!isOpen)} />
            <Link to="/signup" className="mt-2">
              <SuccessBtn text="Register" className="r-btn" />
            </Link>
            <Link to="/signin" className="mt-2">
              <SuccessBtn text="Sign In" className="s-btn" />
            </Link>
          </div>
        </Modal>
      )}
      <div className="main-cont">
        <div className="left">
          {/* logo */}

          {/* text */}
          <div className="text">
            <h3>Meet the perfect passenger.</h3>
            <br />
            {/* <img src={image} alt="" className="img-fluid car" /> */}
            <div className="action-btn">
              {util.isLoggedIn() ? (
                <SuccessBtn
                  onClick={() => {
                    util.redirect(`/profile/${locData.id}`, 0);
                  }}
                  text="profile"
                  className="mt-2 ml-2"
                />
              ) : (
                <SuccessBtn
                  onClick={() => setIsopen(!isOpen)}
                  text="Get Started"
                  className="mt-2 mr-2"
                />
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <p>Features of Go-ride</p>
          <div className="features-box">
            <div className="box">
              <LightningBoltIcon className="icon" />
              <p>Reliable and Fast</p>
            </div>
            <div className="box">
              <ShieldExclamationIcon className="icon" />
              <p>Safe and Easy to use</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
