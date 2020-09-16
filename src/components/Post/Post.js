import React from "react";
import ConnectedPost from "../hoc/connectedPost";
import "./Post.sass";

const Post = ({
  post,
  deletePost,
  user,
  reply,
  replyInput,
  postEdit,
  onReplyFormOpen,
  onReplyFormClose,
  onChangeReplyInput,
  onPostReply,
  onPostEditOpen,
  onPostEditClose,
  onEditPost,
  onEditInputChange,
  onTogleReplySection,
  history
}) => {
  const renderReplies = () => {
    {
      return post.rep.map(r => {
        return (
          <li key={r._id}>
            <ConnectedPost post={r} />
          </li>
        );
      });
    }
  };

  /*const replySectionTogle =
    post.rep && post.rep.length > 0 ? (
      <div className="toggle" onClick={() => onTogleReplySection(post._id)}>
        Show all ({post.rep.length})
      </div>
    ) : null;*/

  const postContent =
    post._id === postEdit ? (
      <div className="editForm">
        <input
          type="text"
          defaultValue={post.body}
          onChange={e => onEditInputChange(e.target.value)}
        />
      </div>
    ) : (
      <p>{post.body}</p>
    );

  const replySection =
    post.rep && post.rep.length > 0 ? (
      <ul className="replySection">{renderReplies()}</ul>
    ) : null;

  const onFriendClick = username => {
    history.push(`/profile/${username}`);
  };

  const controls = (
    <div className="post-buttons">
      {post.user.username === user.username && post._id !== postEdit ? (
        <React.Fragment>
          <i
            className="fa fa-pencil"
            onClick={() => onPostEditOpen(post._id)}
          ></i>
          <i className="fa fa-trash" onClick={() => deletePost(post._id)}></i>
        </React.Fragment>
      ) : post._id === reply ? (
        <React.Fragment>
          <i className="fa fa-check" onClick={() => onPostReply(post._id)}></i>
          <i className="fa fa-times" onClick={onReplyFormClose}></i>
        </React.Fragment>
      ) : post._id === postEdit ? (
        <React.Fragment>
          <i className="fa fa-check" onClick={() => onEditPost(post._id)}></i>
          <i className="fa fa-times" onClick={onPostEditClose}></i>
        </React.Fragment>
      ) : !post.parent ? (
        <i
          className="fa fa-reply"
          onClick={() => onReplyFormOpen(post._id)}
        ></i>
      ) : null}
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
      <div className="top">
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
          {postContent}
          {replyForm}
        </div>
        {controls}
      </div>
      <div className="bot">{replySection}</div>
    </div>
  );
};

export default Post;
