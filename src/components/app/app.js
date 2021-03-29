import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "utils";
import withService from "../hoc/withService";
import { Route, Switch, withRouter } from "react-router-dom";
import useDidMountEffect from "../customHooks/didMountEffect";
import { tryLogin } from "actions/auth";
import { socket } from "actions/socket";

import "./app.sass";

import Login from "../login";
import Profile from "../Profile";
import Background from "./background";

const App = ({ onMount, onCreateSocket, user, history, onBodyClick, shd }) => {
  useEffect(() => {
    onMount();
    //onCreateSocket();
  }, []);

  useDidMountEffect(() => {
    if (!user) {
      return history.push("/login");
    }

    if (history.location.pathname === "/") {
      return history.push(`/profile/${user.username}`);
    }
  }, [user]);

  const shading = shd ? <div className="shading"></div> : null;

  return (
    <div className="app" onClick={onBodyClick}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile/:username" component={Profile} />
      </Switch>
      {shading}
      <Background />
    </div>
  );
};

export default compose(
  withRouter,
  withService,
  connect(
    ({ auth: { user }, profile: { shading } }) => ({ user, shd: shading }),

    (dispatch, { service, history }) => {
      return {
        onMount: () => dispatch(tryLogin(service)(history)),
        onCreateSocket: () => dispatch(socket(service)(history)),
        onBodyClick: () => dispatch("HIDE_DROPDOWN"),
      };
    }
  )
)(App);
