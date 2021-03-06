import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "utils";

import { withRouter } from "react-router-dom";
import { withService, withSocket } from "components/hoc/withService";
import useDidMountEffect from "components/customHooks/didMountEffect";
import { fetchProfile } from "actions/profile";
import { createSocket } from "actions/socket";

import Photo from "../Photo";
import Controls from "../Controls";
import Timeline from "../Timeline";
import Friends from "../Friends";
import UserMenu from "../UserMenu";
import Preloader from "../preloader";
import PopupSection from "../PopupSection";

import "./Profile.sass";

const Profile = ({
  user,
  fetching,
  onMount,
  match,
  popupRender,
  onCreateSocket,
}) => {
  const checkAuth = (hook) => (cb) => (deps) => {
    if (!user) return;
    hook(cb, deps);
  };

  checkAuth(useEffect)(() => {
    onMount();
    onCreateSocket();
  })([]);

  checkAuth(useDidMountEffect)(() => onMount())([match.params.username, user]);

  const popup = popupRender ? <PopupSection render={popupRender} /> : null;

  const content = fetching ? (
    <Preloader height="250px" width="250px" color="lightBlue" />
  ) : (
    <React.Fragment>
      {popup}
      <UserMenu />
      <div className="left">
        <Photo />
        <Controls />
      </div>
      <div className="right">
        <Timeline />
        <Friends />
      </div>
    </React.Fragment>
  );

  return <div className="profile">{content}</div>;
};

const mapStateToProps = ({
  auth: { user },
  profile: { fetching, popupRender },
}) => ({
  user,
  fetching,
  popupRender,
});

const mapDispatchToProps = (
  dispatch,
  { service, socket, history, match: { params } }
) => ({
  onMount: () => dispatch(fetchProfile(service)(params.username)(history)),
  onCreateSocket: () => dispatch(createSocket(socket)(history)),
});

export default compose(
  withService,
  withSocket,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
