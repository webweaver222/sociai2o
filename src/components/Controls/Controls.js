import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Controls.sass";

const Controls = ({
  relations,
  data,
  user,
  onRemoveFriend,
  onAddFriend,
  onAcceptFriend
}) => {
  let span;
  let pannel;

  if (data.username === user.username) controls = null;
  else if (relations.isRequestSend)
    span = <span>You have send request to {data.username}</span>;
  else if (relations.isRequestPending) {
    span = <span>You have friend request pending form {data.username}</span>;
    pannel = (
      <div className="pannel">
        <button onClick={onAcceptFriend}>Accept</button>
      </div>
    );
  } else if (relations.isFriend) {
    span = <span>{data.username} is your friend</span>;
    pannel = (
      <div className="pannel">
        <button onClick={onRemoveFriend}>Remove</button>
      </div>
    );
  } else
    pannel = (
      <div className="pannel">
        <button onClick={onAddFriend}>Add Friend</button>
      </div>
    );

  let controls = (
    <React.Fragment>
      {span}
      {pannel}
    </React.Fragment>
  );

  return <div className="controls">{controls}</div>;
};

Controls.propTypes = {
  // bla: PropTypes.string,
};

Controls.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = ({ profile: { relations, data }, auth: { user } }) => ({
  relations,
  data,
  user
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
