import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Controls.sass";

const Controls = props => {
  const add = <button>Add Friend</button>;
  const accept = <button>Accept</button>;
  const decline = <button>Decline</button>;
  const deleteF = <button>Delete</button>;

  const span = <span>You have a friend request from Alex</span>;

  return (
    <div className="controls">
      {span}
      <div className="pannel">
        {accept}
        {decline}
      </div>
    </div>
  );
};

Controls.propTypes = {
  // bla: PropTypes.string,
};

Controls.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
