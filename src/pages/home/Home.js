import React, {useState} from 'react'
import { LightningBoltIcon, ShieldExclamationIcon, XIcon } from '@heroicons/react/solid'

import "./style.css"
import { SuccessBtn } from '../../helpers/buttons'
import image from "../../assets/img/car.png"
import Modal from '../../components/Modal/Modal'

function Home() {
    const [isOpen, setIsopen] = useState(false);

    return (
        <>
            {isOpen && <Modal>
                <div className="info-cont">
                    <XIcon className="icon" onClick={()=>setIsopen(!isOpen)} />
                    <SuccessBtn text="Register" className="mt-2 r-btn" />
                    <SuccessBtn text="Sign In" className="mt-2 s-btn" />
                </div>
            </Modal>}
            <div className="main-cont">
                <div className="left">
                    {/* logo */}

                    {/* text */}
                    <div className="text">
                        <h3>Meet the perfect passenger.</h3>
                        <br />
                        <img src={image} alt="" className="img-fluid car" />
                        <SuccessBtn onClick={()=>setIsopen(!isOpen)} text="Get Started" className="mt-2" />
                    </div>
                </div>
                <div className="right">
                    <p className="head">Features of Go-ride</p>
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
    )
}

export default Home
