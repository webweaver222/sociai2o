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
  onEnter
}) => (
  <Login
    render={(fetching, error, valid_errors) => {
      return (
        <div className="login-body">
          <h2>Login</h2>
          {error}
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
          <button onClick={onEnter}>{fetching ? fetching : "Log In"}</button>
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
    onEnter: () => dispatch(try_auth(service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
