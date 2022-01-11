import React, { useState, useEffect } from "react";

function Timer({ sec }) {
  let [seconds, setSeconds] = useState(sec);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds--);
      }
      console.log(seconds);
      if (seconds === 0) {
        setSeconds(0);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return <div>{seconds === 0 ? null : <h1> {seconds}</h1>}</div>;
}

export default Timer;
