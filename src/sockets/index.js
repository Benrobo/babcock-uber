import React, { useState } from "react";

import { io } from "socket.io-client";

let socket = io("http://localhost:5000", {
  reconnection: true,
});

export default socket;
