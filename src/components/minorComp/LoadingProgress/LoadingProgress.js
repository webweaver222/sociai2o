import React from "react";
import { connect } from "react-redux";
import "./LoadingProgress.sass";

const LoadingProgress = props => {
  return (
    <div className="progressBar ">
      <span style={{ width: "65%" }}></span>
    </div>
  );
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingProgress);
