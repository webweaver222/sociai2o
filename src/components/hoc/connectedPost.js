import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";
import { deletePost, postReply } from "../../actions";
import Post from "../Post";

import withService from "./withService";
import { withRouter } from "react-router-dom";

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
  onPostReply: id => dispatch(postReply(service)(id)),
  onTogleReplySection: id => dispatch(togleReplySection)
});

const ConnectedPost = props => <Post {...props} />;

export default compose(
  withService,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ConnectedPost);
