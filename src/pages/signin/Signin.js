import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowLeftIcon } from '@heroicons/react/solid'

import { SuccessBtn } from '../../helpers/buttons'
import "./style.css"

function Signin() {
    const [tab, setTab] = useState("user")
    const [active, setActive] = useState(false)

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
                        <div className={active === true && tab === "user" ? "left active" : "left"} onClick={() => {
                            setTab("user")
                            setActive(!active)
                        }}>User</div>
                        <div className={active === true && tab === "driver" ? "right active" : "right"} onClick={() => {
                            setTab("driver")
                            setActive(!active)
                        }}>Driver</div>
                    </div>
                    <br />
                    {tab === "user" ?
                        <div className="user-form form">
                            <input type="text" placeholder="Matric Number" className="input" />
                            <input type="password" placeholder="Password" className="input" />
                            <SuccessBtn text="Create Account" className={"btn-block"} />
                        </div> :
                        <div className="driver-form form">
                            <input type="tel" placeholder="number" className="input"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                maxLength="11"
                                required />
                            <input type="password" placeholder="Password" className="input" />
                            <SuccessBtn text="Create Account" className={"btn-block"} />
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Signin
