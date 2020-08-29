import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import withService from "../hoc/withService";
import { Route, Switch, withRouter } from "react-router-dom";
import useDidMountEffect from "../customHooks/didMountEffect";
import { tryLogin } from "../../actions";

import "./app.sass";
import bgc from "../../resources/svg/background.html";

import Login from "../login";
import Profile from "../Profile";

const App = ({ onMount, user, history, onBodyClick }) => {
  useEffect(() => {
    onMount();
  }, []);

  useDidMountEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  return (
    <div className="app" onClick={onBodyClick}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile/:username" component={Profile} />
      </Switch>

      <div className="background" dangerouslySetInnerHTML={{ __html: bgc }} />
    </div>
  );
};

export default compose(
  withRouter,
  withService,
  connect(
    ({ auth: { user } }) => ({ user }),

    (dispatch, { service, history }) => {
      return {
        onMount: () => dispatch(tryLogin(service)(history)),
        onBodyClick: () => dispatch("HIDE_DROPDOWN")
      };
    }
  )
)(App);
