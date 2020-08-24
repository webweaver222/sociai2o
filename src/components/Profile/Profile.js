import React from "react";

import { connect } from "react-redux";

import Photo from "../Photo";
import Controls from "../Controls";
import Timeline from "../Timeline";
import Friends from "../Friends";

import "./Profile.sass";

const Profile = ({}) => {
  return (
    <div className="profile">
      <div className="left">
        <Photo />
        <Controls />
      </div>
      <div className="right">
        <Timeline />
        <Friends />
      </div>
    </div>
  );
};

Profile.propTypes = {
  // bla: PropTypes.string,
};

Profile.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
