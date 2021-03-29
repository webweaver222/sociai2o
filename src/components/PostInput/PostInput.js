import React from "react";
import { connect } from "react-redux";

import { compose } from "utils";
import { postMessage } from "actions/posts";

//import { withRouter } from "react-router-dom";
import withService from "../hoc/withService";

const PostInput = ({ postInput, changePostInput, postMessage }) => {
  return (
    <div className="post-input section-block">
      <input
        type="text"
        placeholder="What's up?"
        value={postInput}
        onChange={(e) => {
          changePostInput(e.target.value);
        }}
      />
      <div className="send" onClick={postMessage}>
        <i className="fa fa-paper-plane"></i>
      </div>
    </div>
  );
};

PostInput.propTypes = {
  // bla: PropTypes.string,
};

PostInput.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = ({ timeline: { postInput } }) => ({
  postInput,
});

const mapDispatchToProps = (dispatch, { service }) => ({
  changePostInput: (text) =>
    dispatch({ type: "CHANGE_POST_INPUT", payload: text }),
  postMessage: () => dispatch(postMessage(service)),
});

export default compose(
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(PostInput);
