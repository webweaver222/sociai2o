import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import pic from "../../resources/img/girl3.png";

import "./Photo.sass";

const Photo = props => {
  console.log(pic);
  return (
    <div className="photo section-block">
      <h2>Alex Porier</h2>
      <img src={pic} height={"90%"} width={"90%"} alt="photo" />
    </div>
  );
};

Photo.propTypes = {
  // bla: PropTypes.string,
};

Photo.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
