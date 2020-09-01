import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";

import { withRouter } from "react-router-dom";
import withService from "../hoc/withService";
import useDidMountEffect from "../customHooks/didMountEffect";
import { fetchProfile } from "../../actions";

import Photo from "../Photo";
import Controls from "../Controls";
import Timeline from "../Timeline";
import Friends from "../Friends";
import UserMenu from "../UserMenu";
import Preloader from "../preloader";

import "./Profile.sass";

const Profile = ({ user, fetching, onMount, match }) => {
  useEffect(() => {
    onMount();
  }, []);

  useDidMountEffect(() => {
    onMount();
  }, [match.params.username]);

  const content = fetching ? (
    <Preloader height="250px" width="250px" color="lightBlue" />
  ) : (
    <React.Fragment>
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

const mapStateToProps = ({ auth: { user }, profile: { fetching } }) => ({
  user,
  fetching
});

const mapDispatchToProps = (
  dispatch,
  { service, history, match: { params } }
) => ({
  onMount: () => dispatch(fetchProfile(service)(params.username)(history))
});

export default compose(
  withService,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
