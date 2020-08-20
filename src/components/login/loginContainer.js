import React from "react";
import { connect } from "react-redux";
//import withService from "../hoc/withService";

import "./login.sass";
import Login from "./login";

const LoginContainer = ({
  login,
  password,
  changeLog,
  changePass,
  onLogIn,
  onSignUp,
  signup = false
}) => (
  <Login
    render={(fetching, error, valid_errors) => {
      const btn = signup ? (
        <button onClick={onSignUp}>{fetching ? fetching : "Sign Up"}</button>
      ) : (
        <button onClick={onLogIn}>{fetching ? fetching : "Log In"}</button>
      );

      const span = !signup ? (
        <span>
          Don't have an account yet? <a href="#">Sign Up</a>
        </span>
      ) : (
        <span>
          Already have an account? <a href="#">Log In</a>
        </span>
      );

      const mail = signup ? (
        <div className="log">
          <label htmlFor="mail">Email:</label>
          <input
            type="text"
            className={
              valid_errors.hasOwnProperty("login") ? "input-error" : ""
            }
            id="mail"
            value={login || ""}
            onChange={e => changeLog(e.target.value)}
          />
        </div>
      ) : null;

      return (
        <div className="login-body">
          <h2>Welcome to the SociAi</h2>
          {error}
          {mail}
          <div className="log">
            <label htmlFor="login">Login:</label>
            <input
              type="text"
              className={
                valid_errors.hasOwnProperty("login") ? "input-error" : ""
              }
              id="login"
              value={login || ""}
              onChange={e => changeLog(e.target.value)}
            />
          </div>
          <div className="pass">
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              className={
                valid_errors.hasOwnProperty("password") ? "input-error" : null
              }
              id="pass"
              value={password || ""}
              onChange={e => changePass(e.target.value)}
            />
          </div>
          {btn}
          {span}
        </div>
      );
    }}
  />
);

const mapStateToProps = ({ auth: { login, password } }) => ({
  login,
  password
});

const mapDispatchToProps = (dispatch, { service }) => {
  return {
    changeLog: text => dispatch({ type: "CHANGE_LOGIN_INPUT", payload: text }),
    changePass: pass => dispatch({ type: "CHANGE_PASS_INPUT", payload: pass }),
    onLogIn: () => dispatch(try_auth(service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
