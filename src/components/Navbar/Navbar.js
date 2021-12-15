import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

function Navbar() {
    return (
        <>
            <div className="navbar-cont">
                <div className="logo">Logo</div>
                <div className="right">
                    <img src="https://avatars.dicebear.com/api/micah/ben.svg" alt="" className="user-img img-fluid" />
                    <div className="more-info">
                        <Link to="">Request Ride</Link>
                        <Link to="">
                            Notification <span className="badge badge-primary">12</span>
                        </Link>
                        <Link to="" className="logout">Logout</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
