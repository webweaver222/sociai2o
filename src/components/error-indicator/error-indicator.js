import React from "react";

import img from "./sadFace.png";
import "./error-indicator.sass";

const ErrorIndicator = ({ message = null, type }) => {
  return (
    <div className="error-indicator">
      <h2>Somthing went wrong</h2>
      <img height="150" src={img} alt="sadFace.png" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorIndicator;
