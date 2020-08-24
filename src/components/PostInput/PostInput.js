import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PostInput = props => {
  return (
    <div className="post-input section-block">
      <input type="text" placeholder="What's up?" />
      <div className="send">
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

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostInput);
