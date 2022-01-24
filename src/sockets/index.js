import React, { useState } from "react";
import { io } from "socket.io-client";

let socket = io.connect("http://localhost:5000", {
  reconnection: false,
});

socket.on("connect", () => {
  let socketId = socket.id;
  const data = {
    socketId,
  };
  // save socket id in localstorage

  localStorage.setItem("socket", JSON.stringify(data));
});

export default socket;
