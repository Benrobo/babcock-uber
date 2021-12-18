import React from 'react'
import { Link } from 'react-router-dom'
import LocationBox from '../../components/LocationBox/LocationBox'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Head from '../../components/MainHead/Head'
import "./style.css"
import Navbar from '../../components/Navbar/Navbar'

function Request() {
    return (
        <>
            <Navbar />
            <div className="request-cont">
                <div className="head mb-4">
                    <Link to="/">
                        <ArrowLeftIcon className="icon" />
                    </Link>
                    <h3>Get a Ride</h3>
                </div>
                <LocationBox />

                <br />
                <div className="request-info">
                    <img src="https://avatars.dicebear.com/api/micah/joy.svg" alt="" className="img-fluid" />
                    <br />
                    <div className="timer-cont">
                        11:05
                    </div>
                    <br />
                    <div className="actions-btn">
                        <button className="accept btn">Accept</button>
                        <button className="reject btn">Reject</button>
                    </div>
                </div>
                <br />
                <br />
            </div>
        </>
    )
}

export default Request
