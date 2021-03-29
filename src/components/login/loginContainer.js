import React from "react";
import { connect } from "react-redux";
import { compose } from "utils";
import withService from "../hoc/withService";
import { withRouter } from "react-router-dom";
import { signup, auth } from "actions/auth";
//import withService from "../hoc/withService";

import "./login.sass";
import Login from "./login";

const LoginContainer = ({
  login,
  password,
  email,
  changeLog,
  changePass,
  onLogIn,
  changeMail,
  onSignUp,
  onChangeAuthType,
  signup,
}) => (
  <Login
    render={(fetching, error, valid_errors) => {
      const btn = signup ? (
        <button onClick={onSignUp}>{fetching ? fetching : "Sign Up"}</button>
      ) : (
        <button onClick={onLogIn}>{fetching ? fetching : "Log In"}</button>
      );

      const onChangeType = (e) => {
        e.preventDefault();
        onChangeAuthType();
      };

      const span = !signup ? (
        <span>
          Don't have an account yet?{" "}
          <a href="#" onClick={onChangeType}>
            Sign Up
          </a>
        </span>
      ) : (
        <span>
          Already have an account?{" "}
          <a href="#" onClick={onChangeType}>
            Log In
          </a>
        </span>
      );

      const log = signup ? (
        <div className="log">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            className={
              valid_errors.hasOwnProperty("login") ? "input-error" : ""
            }
            id="login"
            value={login || ""}
            onChange={(e) => changeLog(e.target.value)}
          />
        </div>
      ) : null;

      return (
        <div className="login-body">
          <h2>Welcome to the SociAi</h2>
          {error}
          <div className="log">
            <label htmlFor="mail">Email:</label>
            <input
              type="email"
              autoComplete="on"
              className={
                valid_errors.hasOwnProperty("login") ? "input-error" : ""
              }
              id="mail"
              value={email || ""}
              onChange={(e) => changeMail(e.target.value)}
            />
          </div>
          {log}

          <div className="pass">
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              className={
                valid_errors.hasOwnProperty("password") ? "input-error" : null
              }
              id="pass"
              value={password || ""}
              onChange={(e) => changePass(e.target.value)}
            />
          </div>
          {btn}
          {span}
        </div>
      );
    }}
  />
);

const mapStateToProps = ({ auth: { login, password, signup, email } }) => ({
  login,
  password,
  email,
  signup,
});

const mapDispatchToProps = (dispatch, { service, history }) => {
  return {
    changeLog: (text) =>
      dispatch({ type: "CHANGE_LOGIN_INPUT", payload: text }),
    changePass: (pass) =>
      dispatch({ type: "CHANGE_PASS_INPUT", payload: pass }),
    changeMail: (text) =>
      dispatch({ type: "CHANGE_EMAIL_INPUT", payload: text }),
    onLogIn: () => dispatch(auth(service)(history)),
    onSignUp: () => dispatch(signup(service)(history)),
    onChangeAuthType: () => dispatch("CHANGE_AUTH_TYPE"),
  };
};

export default compose(
  withRouter,
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer);
