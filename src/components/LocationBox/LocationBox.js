import React from 'react'
import { CheckCircleIcon, LocationMarkerIcon, XIcon } from "@heroicons/react/solid";

import "./style.css"

function LocationBox({from="lagos", to="ikeja"}) {
    return (
        <>
            <div className="location-cont">
                <div className="top box">
                    <CheckCircleIcon className="icon pickup" />
                    <div className="info">
                        <p>Pickup Location</p>
                        <small>{from}</small>
                    </div>
                </div>
                <hr />
                <div className="bottom box">
                    <LocationMarkerIcon className="icon drop" />
                    <div className="info">
                        <p>Drop Location</p>
                        <small>{to}</small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LocationBox
