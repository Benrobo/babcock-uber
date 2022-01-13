import React, { useState, useEffect } from "react";
import socket from "../../sockets";

function Timer({ sec, socketId, setReqest }) {
  let [seconds, setSeconds] = useState(sec);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    if (seconds === 0) {
      socket.emit("no-respond", { msg: "No driver responded", id: socketId });
      setReqest(false);
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      {seconds === 0 ? (
        <h1 className="mt-4 timer">{0}</h1>
      ) : (
        <h1 className="mt-4 timer"> {seconds}</h1>
      )}
    </div>
  );
}

export default Timer;
