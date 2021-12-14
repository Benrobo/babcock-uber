import React, {useState} from "react"



export function SuccessBtn({onClick, text, className}){
    function handleClick(){
        onClick()
    }

    return (
        <button className={"btn "+className} onClick={handleClick} style={greenBtn}>{text}</button>
    )
}

export function DangerBtn({onClick, text, className}){
    function handleClick(){
        onClick()
    }

    return (
        <button className={"btn "+className} onClick={handleClick} style={redBtn}>{text}</button>
    )
}

const greenBtn = {
    padding:"10px",
    background: "#4ac074",
    color: "#000",
    fontWeight: 900
}

const redBtn = {
    padding:"10px",
    background: "red",
    color: "#000",
    fontWeight: 400
}