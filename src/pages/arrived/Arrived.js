import React from 'react'
import {useParams} from "react-router"
import Navbar from '../../components/Navbar/Navbar'

function Arrived() {
    const info = useParams("https://localhost:3000/arrived/user/453643tergdf/45645tyertgf")

    console.log(info)
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Arrived