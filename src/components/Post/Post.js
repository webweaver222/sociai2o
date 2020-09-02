import React, { use } from "react";
import { compose } from "../../utils";
import { connect } from "react-redux";
import withService from "../hoc/withService";
import { withRouter } from "react-router-dom";

import { deletePost, postReply } from "../../actions";
import "./Post.sass";

const Post = ({
  post,
  isParent = false,
  deletePost,
  user,
  reply,
  replyInput,
  onReplyFormOpen,
  onReplyFormClose,
  onChangeReplyInput,
  onPostReply,
  history
}) => {
  const parent = post.parent ? (
    <div className="parent-wrapper">
      <Post post={post.parent} isParent={true} history={history} />
    </div>
  ) : null;

  const onFriendClick = username => {
    history.push(`/profile/${username}`);
  };

  const controls = (
    <div className="post-buttons">
      {isParent ? null : user.username === post.user.username ? (
        <React.Fragment>
          <i className="fa fa-pencil"></i>
          <i className="fa fa-trash" onClick={() => deletePost(post._id)}></i>
        </React.Fragment>
      ) : post._id === reply ? (
        <React.Fragment>
          <i className="fa fa-check" onClick={() => onPostReply(post._id)}></i>
          <i className="fa fa-times" onClick={onReplyFormClose}></i>
        </React.Fragment>
      ) : (
        <i
          className="fa fa-reply"
          onClick={() => onReplyFormOpen(post._id)}
        ></i>
      )}
    </div>
  );

  const replyForm =
    reply === post._id ? (
      <div className="replyForm">
        <input
          type="text"
          value={replyInput}
          onChange={e => onChangeReplyInput(e.target.value)}
        />
      </div>
    ) : null;

  return (
    <div className="post">
      <div className="avatar">
        <div
          className="pic"
          onClick={() => onFriendClick(post.user.username)}
          style={{ backgroundImage: `url(${post.user.avatarUrl})` }}
        ></div>
      </div>
      <div className="post-body">
        <span onClick={() => onFriendClick(post.user.username)}>
          {post.user.username}
        </span>
        <p>{post.body}</p>
        {replyForm}
        {parent}
        {controls}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth: { user },
  profile: { reply, replyInput }
}) => ({
  user,
  reply,
  replyInput
});

const mapDispatchToProps = (dispatch, { service }) => ({
  deletePost: id => dispatch(deletePost(service)(id)),
  onReplyFormOpen: id => dispatch({ type: "OPEN_REPLY", payload: id }),
  onReplyFormClose: () => dispatch("CLOSE_REPLY"),
  onChangeReplyInput: text =>
    dispatch({ type: "CHANGE_REPLY_INPUT", payload: text }),
  onPostReply: id => dispatch(postReply(service)(id))
});

export default compose(
  withRouter,
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(Post);
