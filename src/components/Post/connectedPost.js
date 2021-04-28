import React from "react";
import { connect } from "react-redux";
import { compose } from "utils";
import { deletePost, postReply, editPost } from "actions/posts";
import Post from "components/Post";

import { withService } from "components/hoc/withService";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({
  auth: { user },
  timeline: { reply, replyInput, editInput, postEdit },
}) => ({
  user,
  reply,
  replyInput,
  editInput,
  postEdit,
});

const mapDispatchToProps = (dispatch, { service }) => ({
  deletePost: (id) => dispatch(deletePost(service)(id)),
  onReplyFormOpen: (id) => dispatch({ type: "OPEN_REPLY", payload: id }),
  onReplyFormClose: () => dispatch("CLOSE_REPLY"),
  onChangeReplyInput: (text) =>
    dispatch({ type: "CHANGE_REPLY_INPUT", payload: text }),
  onPostReply: (id) => dispatch(postReply(service)(id)),
  onTogleReplySection: (id) => dispatch(togleReplySection),
  onPostEditOpen: (id) => dispatch({ type: "OPEN_EDIT", payload: id }),
  onPostEditClose: () => dispatch("CLOSE_EDIT"),
  onEditPost: (id) => dispatch(editPost(service)(id)),
  onEditInputChange: (text) =>
    dispatch({ type: "CHANGE_EDIT_INPUT", payload: text }),
});

const ConnectedPost = (props) => <Post {...props} />;

export default compose(
  withService,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ConnectedPost);
