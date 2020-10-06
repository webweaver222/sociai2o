import React from "react";
import { compose } from "../../utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withFriendsMouseEvents from "../hoc/withFriendsMouseEvents";
import qm from "../../resources/img/qm.png";
import "./friends2.sass";

const Friends = ({
  friends: { accepted },
  onFriendClick,
  onFriendSerachChange,
  friendSearch,
  list,
  style,
  onHover,
  onBack,
  onForward,
  setStyle,
  user,
  data
}) => {
  const searchFilter = arr => {
    return arr.filter(
      friend =>
        friend.username.toLowerCase().indexOf(friendSearch.toLowerCase()) > -1
    );
  };

  const renderList = () => {
    const filtred = searchFilter(accepted);
    return filtred.map((friend, i) => {
      return (
        <div
          className="pic"
          onClick={() => onFriendClick(friend.username)}
          key={i}
        >
          <img
            src={friend.avatarUrl}
            alt="img fetch error"
            onError={e => (e.target.src = qm)}
          />
          <div className="name">{friend.username}</div>
          <div className="shadow"></div>
        </div>
      );
    });
  };

  const header =
    user.username === data.username ? (
      <h2>Your Friends: </h2>
    ) : (
      <h2>{data.username}'s Friends:</h2>
    );

  return (
    <div className={`friends2 section-block`}>
      <div className="header">{header}</div>
      <div className="search">
        <div className="inputWrap">
          <input
            type="text"
            value={friendSearch}
            onChange={e => onFriendSerachChange(e.target.value)}
          />
          <i className="fa fa-search" />
        </div>
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

const mapStateToProps = ({
  profile: { friends, data, friendSearch },
  auth: { user }
}) => ({
  friends,
  data,
  user,
  friendSearch
});

const mapDispatchToProps = (dispatch, { history }) => ({
  onFriendClick: username => history.push(`/profile/${username}`),
  onFriendSerachChange: text =>
    dispatch({ type: "FRIEND_SEARCH_CHANGE", payload: text })
});

export default compose(
  withFriendsMouseEvents,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Friends);
