import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { StarIcon, PhoneIcon, XCircleIcon } from '@heroicons/react/solid'

import "./style.css"


function Passenger() {
    return (
        <div>
            <Navbar />
            <DriverDetailsBox />
        </div>
    )
}

function DriverDetailsBox() {
    return (
        <div className="details-box">
            <div className="top-cont">
                <img src="https://avatars.dicebear.com/api/micah/ben.svg" alt="" className="img-fluid" />
                <div className="info">
                    <p className="name">John Doe</p>
                    <span className="trips-count"> 
                    <small>Trips </small>
                    120 <StarIcon className="icon" /></span>
                </div>
            </div>
            <div className="bottom-cont">
                <div className="left bx">
                    <PhoneIcon className="icon" />
                    <span>Call Driver</span>
                </div>
                <div className="right bx">
                    <XCircleIcon className="icon" />
                    <span>Cancel Ride</span>
                </div>
            </div>
        </div>
    )
}

export default Passenger
