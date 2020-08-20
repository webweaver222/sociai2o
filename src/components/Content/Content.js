import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Content.sass";

const Content = props => {
  return <div className="content">Test content</div>;
};

Content.propTypes = {
  // bla: PropTypes.string,
};

Content.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
