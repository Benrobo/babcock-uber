import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Head from '../../components/MainHead/Head'
import { CheckCircleIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import "./style.css"
import { SuccessBtn } from '../../helpers/buttons'

function Ride() {
    return (
        <>
            <Navbar />
            <div className="ride-cont">
                <div className="form">
                    <Head text="Get a Ride" />
                    <div className="pickup-box box">
                        <CheckCircleIcon className="icon check" />
                        <input type="text" placeholder="Pickup location" className="pickup inp" />
                    </div>
                    <div className="drop-box box">
                        <LocationMarkerIcon className="icon location" />
                        <input type="text" placeholder="Drop location" className="drop inp" />
                    </div>
                    <br />
                    {/* <button className="btn submit btn-block">Get a Ride</button> */}
                    <SuccessBtn text="Get a Ride" className="btn submit-btn" />
                </div>
            </div>
        </>
    )
}

export default Ride
