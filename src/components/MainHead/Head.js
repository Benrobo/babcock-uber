import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import "./style.css"

function Head({text}) {
    return (
        <div className="head">
            <Link to="/">
                <ArrowLeftIcon className="icon" />
            </Link>
            <h3>{text}</h3>
        </div>
    )
}

export default Head
