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

  // fetch data
  // useEffect(() => {
  //   async function getUserData() {
  //     setLoading(true);
  //     const url = "http://localhost:5000/api/users";
  //     const sendData = {
  //       userId: locData.id,
  //       role: locData.role,
  //     };

  //     try {
  //       await http.post(
  //         url,
  //         sendData,
  //         {
  //           "content-type": "application/json",
  //         },
  //         (data) => {
  //           if (data.req.status === 200) {
  //             setLoading(false);
  //             setAuthUserInfo([data.res]);
  //             setError(null);
  //             return;
  //           }
  //           setLoading(false);
  //           setError(data.res);
  //         }
  //       );
  //     } catch (err) {
  //       setLoading(false);
  //       setError(err);
  //     }
  //   }
  //   getUserData();
  // }, []);

  return (
    <DataContext.Provider value={{ authUserInfo, loading, error }}>
      {props.children}
    </DataContext.Provider>
  );
}
