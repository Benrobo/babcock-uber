import React from 'react'
import { StarIcon, PhoneIcon, XCircleIcon } from '@heroicons/react/solid'

import "./style.css"
import Navbar from '../../components/Navbar/Navbar'


function Driver() {
    return (
        <div>
            <Navbar />
            <DriverDetailsBox />
        </div>
    )
}

function DriverDetailsBox() {
    return (
        <div className="driver-ride-cont">
            <div className="details-box">
                <div className="top-cont">
                    <img src="https://avatars.dicebear.com/api/micah/ben.svg" alt="" className="img-fluid" />
                    <div className="info">
                        <p className="name">John Doe</p>
                        <div className="location-info">
                            <small>Drop Location</small>
                            <p>Austin texas</p>
                        </div>
                    </div>
                </div>
                <div className="bottom-cont">
                    <div className="counter-cont bx">
                        <span className="counter">
                            01 min
                        </span>
                    </div>
                    <div className="left bx">
                        <PhoneIcon className="icon" />
                        <span>Call Driver</span>
                    </div>
                </div>
            </div>
            <button className="btn ride-status">
                Start Ride
            </button>
        </div>
    )
}

export default Driver
