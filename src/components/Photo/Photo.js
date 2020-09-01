import React from "react";
import { connect } from "react-redux";

import pic from "../../resources/img/girl3.png";

import "./Photo.sass";

const Photo = ({ data }) => {
  return (
    <div className="photo section-block">
      <h2>{data.username}</h2>
      <img src={data.avatarUrl} height={"90%"} width={"90%"} alt="photo" />
    </div>
  );
};

const mapStateToProps = ({ profile: { data } }) => ({
  data
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
