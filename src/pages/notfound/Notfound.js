import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Notfound() {
  const { pageId } = useParams();

  return (
    <div className="container text-center m-5 p-3">
      <h1>404</h1>
      <h5>
        The page your looking for doesnt exist <code>{pageId}</code>
        <br />
        <br />
        <br />
        <Link className="btn btn-primary" to={`/`}>
          Go Home
        </Link>
      </h5>
    </div>
  );
}

export default Notfound;
