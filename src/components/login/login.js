import React from "react";
import { connect } from "react-redux";

import Preloader from "../preloader";
import SadFace from "../../resources/svg/sad-face.html";

const Login = ({ render, login_fetching, auth_error, valid_errors }) => {
  const preloader = login_fetching ? <Preloader /> : null;

  const error = auth_error ? (
    <div className="errorBlock">
      <SadFace />
      <div className="message">
        <h2>Enter failed</h2>
        <span>{auth_error}</span>
      </div>
    </div>
  ) : null;

  return <div className="login">{render(preloader, error, valid_errors)}</div>;
};

export default connect(
  ({ auth: { login_fetching, auth_error, valid_errors } }) => {
    return {
      login_fetching,
      auth_error,
      valid_errors
    };
  },
  null
)(Login);
