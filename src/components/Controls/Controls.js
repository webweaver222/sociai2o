import React from "react";
import { compose } from "../../utils";
import { connect } from "react-redux";

import withService from "../hoc/withService";
import { addFriend, removeFriend, acceptFriend } from "../../actions";
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

  console.log(data);
  if (data.username === user.username) controls = null;
  else if (relations.isRequestSend)
    span = <span>You have send request to {data.username}</span>;
  else if (relations.isRequestPending) {
    span = <span>You have friend request form {data.username}</span>;
    pannel = (
      <div className="pannel">
        <button onClick={() => onAcceptFriend(data._id)}>Accept</button>
      </div>
    );
  } else if (relations.isFriend) {
    span = <span>{data.username} is your friend</span>;
    pannel = (
      <div className="pannel">
        <button onClick={() => onRemoveFriend(data._id)}>Remove</button>
      </div>
    );
  } else
    pannel = (
      <div className="pannel">
        <button onClick={() => onAddFriend(data._id)}>Add Friend</button>
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

const mapStateToProps = ({ profile: { relations, data }, auth: { user } }) => ({
  relations,
  data,
  user
});

const mapDispatchToProps = (dispatch, { service }) => ({
  onAcceptFriend: id => dispatch(acceptFriend(service)(id)),
  onRemoveFriend: id => dispatch(removeFriend(service)(id)),
  onAddFriend: id => dispatch(addFriend(service)(id))
});

export default compose(
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(Controls);
