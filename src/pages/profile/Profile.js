import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Switch from 'react-input-switch';
import "./style.css"
import { Link } from 'react-router-dom'
import mapImg from "../../assets/img/map-bg.png"

function Profile() {
    const [switchVal, setSwitchVal] = useState(0);

    return (
        <>
            <Navbar />
            <div className="profile-cont">
                <div className="head">
                    <Link to="/">
                        <ArrowLeftIcon className="icon" />
                    </Link>
                    <h3>Profile</h3>
                </div>
                <br />
                <div className="user-info-head">
                    <img src="https://avatars.dicebear.com/api/micah/ben.svg" alt="" className="user-img img-fluid" />
                    <div className="info">
                        <h3>John Doe</h3>
                        <div className="m-info">
                            <span className="info-txt">
                                student | online <Switch value={switchVal} onChange={setSwitchVal} styles={{ trackChecked: { backgroundColor: 'var(--text-g)' }, buttonChecked: { background: 'green' } }} />
                            </span>
                        </div>
                    </div>
                </div>
                <br />
                <StatReview />
                <br />
                <UserProfileDetails />
                <br />
                <UserTrips />
                <br />
            </div>
        </>
    )
}

function StatReview() {
    return (
        <>
            <p>Stat</p>
            <br />
            <div className="stat-cont">
                <div className="box">
                    <div className="text">Accepted Trips</div>
                    <div className="count">23</div>
                </div>
                <div className="box">
                    <div className="text">Rejected Trips</div>
                    <div className="count">3</div>
                </div>
            </div>
        </>
    )
}

function UserProfileDetails() {
    return (
        <div className="details-cont">
            <li>
                <span className="grey">name</span>
                <span className="detail-txt">John Doe</span>
            </li>
            <li>
                <span className="grey">email</span>
                <span className="detail-txt">test@gmail.com</span>
            </li>
            <li>
                <span className="grey">matric number</span>
                <span className="detail-txt">334c587</span>
            </li>
            <li>
                <span className="grey">Place Number</span>
                <span className="detail-txt">RGB76GH</span>
            </li>
            <li>
                <span className="grey">password</span>
                <span className="detail-txt">******</span>
            </li>

            <button className="edit-btn btn">Edit Profile</button>
        </div>
    )
}

function UserTrips() {
    return (
        <>
            <h3>Your Trips</h3>
            <div className="trips-cont">
                <div className="trips">
                    <img src={mapImg} alt="" className="img-fluid" />
                    <div className="trip-info">
                        <p className="location"><small>From</small>: Location Here</p>
                        <span className="time">Mon 22, 2020 4:00pm</span>
                    </div>
                </div>
                <div className="trips">
                    <img src={mapImg} alt="" className="img-fluid" />
                    <div className="trip-info">
                        <p className="location"><small>From</small>: Location Here</p>
                        <span className="time">Mon 22, 2020 4:00pm</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
