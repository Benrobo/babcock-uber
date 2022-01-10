import React, { useState } from "react";

export class Socket {
  constructor(io) {
    if (io == "" || io == undefined || io == null) {
      throw Error("Socket.io requires an io instance");
    }
    this.io = io("http://localhost:5000");
  }

  handleRideRequestPost(from = "", to = "", userId = "", role = "") {
    let io = this.io;

    // send data to backend
    let sendData = {
      from,
      to,
      userId,
      role,
    };
    io.emit("student_ride_request", sendData);
  }

  initMain() {
    //   this would be responsible for listening for any connection made
  }
}
