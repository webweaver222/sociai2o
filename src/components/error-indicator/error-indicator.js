import React from "react";

import img from "./sadFace.png";
import "./error-indicator.sass";

const ErrorIndicator = ({ message = null, type }) => {
  const errorType =
    type === "error" ? "alert alert-danger" : "alert alert-warning";

  return (
    <div className="error-indicator">
      <div className={errorType}>
        <h2>Somthing went wrong</h2>
        <img src={img} alt="sadFace.png" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorIndicator;
