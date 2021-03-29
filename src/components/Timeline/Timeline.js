import React, { useRef } from "react";
import { connect } from "react-redux";
import "./timeline.sass";

import PostInput from "../PostInput";
import ConnectedPost from "components/Post/connectedPost";

const Timeline = ({ posts, user, data }) => {
  const listRef = useRef(null);
  console.log(posts);
  const renderList = () => {
    return posts.map((post, i) => {
      return !post.parent ? (
        <li key={i}>
          <ConnectedPost post={post} />
        </li>
      ) : null;
    });
  };

  return (
    <div className="timeline ">
      {user.username === data.username ? <PostInput /> : null}

      <ul
        className="posts-list section-block"
        onWheel={(e) => (listRef.current.scrollTop += e.deltaY * 0.3)}
        ref={listRef}
      >
        {renderList()}
      </ul>
    </div>
  );
};

const mapStateToProps = ({
  profile: { data },
  timeline: { posts },
  auth: { user },
}) => ({
  posts,
  data,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
