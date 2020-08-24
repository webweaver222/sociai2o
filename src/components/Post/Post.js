import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Post.sass";

const Post = ({ post, isParent = false }) => {
  const parent = post.parent ? (
    <div className="parent-wrapper">
      <Post post={post.parent} isParent={true} />
    </div>
  ) : null;

  const controls = isParent ? null : (
    <div className="post-buttons">
      <i className="fa fa-pencil"></i>
      <i className="fa fa-trash"></i>
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

Post.propTypes = {
  // bla: PropTypes.string,
};

Post.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
