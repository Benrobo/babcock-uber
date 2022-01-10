import React, { createContext, useState, useEffect } from "react";

import { Http, Util } from "../helpers/util";

const DataContext = createContext();

export default DataContext;

const http = new Http();
const util = new Util();

export function DataContextProvider(props) {
  const [authUserInfo, setAuthUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // localstorageData
  const locData = util.getLocalstorageData();

  function logout() {
    localStorage.clear();
    util.redirect("/signin", 100);
  }

  return (
    <DataContext.Provider value={{ logout }}>
      {props.children}
    </DataContext.Provider>
  );
}
