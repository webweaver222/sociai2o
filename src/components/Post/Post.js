import React from "react";
import { compose } from "../../utils";
import { connect } from "react-redux";
import withService from "../hoc/withService";

import { deletePost } from "../../actions";
import "./Post.sass";

const Post = ({ post, isParent = false, deletePost }) => {
  const parent = post.parent ? (
    <div className="parent-wrapper">
      <Post post={post.parent} isParent={true} />
    </div>
  ) : null;

  const controls = isParent ? null : (
    <div className="post-buttons">
      <i className="fa fa-pencil"></i>
      <i className="fa fa-trash" onClick={() => deletePost(post._id)}></i>
    </div>
  );

  return (
    <div className="post">
      <div className="avatar">
        <div
          className="pic"
          style={{ backgroundImage: `url(${post.user.avatarUrl})` }}
        ></div>
      </div>
      <div className="post-body">
        <span>{post.user.name}</span>
        <p>{post.body}</p>
        {parent}
        {controls}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = (dispatch, { service }) => ({
  deletePost: id => dispatch(deletePost(service)(id))
});

export default compose(
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(Post);
