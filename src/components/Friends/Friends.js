import React from "react";
import { compose } from "../../utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withFriendsMouseEvents from "../hoc/withFriendsMouseEvents";
import "./friends2.sass";

const Friends = ({
  friends: { accepted },
  onFriendClick,
  list,
  style,
  onHover,
  onBack,
  onForward,
  setStyle
}) => {
  const renderList = () => {
    return accepted.map((friend, i) => {
      return (
        <div
          className="pic"
          onClick={() => onFriendClick(friend.username)}
          key={i}
          style={{ backgroundImage: `url(${friend.avatarUrl})` }}
        >
          <div className="name">{friend.username}</div>
          <div className="shadow"></div>
        </div>
      );
    });
  };

  return (
    <div className={`friends2 section-block`}>
      <div className="header">
        <h2>Alex's Friends: </h2>
      </div>
      <div
        className={`list-wrapper ${style}`}
        onMouseEnter={onHover}
        onMouseLeave={() => setStyle("")}
      >
        <div className="back" onClick={onBack}>
          <i className="fa fa-caret-up"></i>
        </div>
        <div className="forward" onClick={onForward}>
          <i className="fa fa-caret-down"></i>
        </div>
        <div className="list">
          <div className="list-flex-container" ref={list}>
            {renderList()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile: { friends } }) => ({
  friends
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onFriendClick: username => history.push(`/profile/${username}`)
});

export default compose(
  withFriendsMouseEvents,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Friends);
