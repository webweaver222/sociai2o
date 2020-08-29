import React from "react";
import { connect } from "react-redux";

import pic from "../../resources/img/girl3.png";

import "./Photo.sass";

const Photo = ({ user }) => {
  return (
    <div className="photo section-block">
      <h2>alex mongol</h2>
      <img src={pic} height={"90%"} width={"90%"} alt="photo" />
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
