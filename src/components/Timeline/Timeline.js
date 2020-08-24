import React, { useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./timeline.sass";

import PostInput from "../PostInput";
import Post from "../Post";

const Timeline = props => {
  const listRef = useRef(null);

  const list = [
    {
      body:
        "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem",
      user: {
        name: "bobby",
        avatarUrl: "src/resources/img/pepsi.jpg"
      },
      parent: {
        body:
          "LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  ",
        user: {
          name: "marselas",
          avatarUrl: "src/resources/img/girl2.jpg"
        }
      }
    },
    {
      body:
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      user: {
        name: "lary",
        avatarUrl: "src/resources/img/girl3.png"
      }
    },
    {
      body:
        "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem",
      user: {
        name: "bobby",
        avatarUrl: "src/resources/img/pepsi.jpg"
      },
      parent: {
        body:
          "LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  LoremRbas  ",
        user: {
          name: "marselas",
          avatarUrl: "src/resources/img/girl2.jpg"
        }
      }
    }
  ];

  const renderList = () => {
    return list.map((post, i) => {
      return (
        <li key={i}>
          <Post post={post} />
        </li>
      );
    });
  };

  return (
    <div className="timeline ">
      <PostInput />

      <ul
        className="posts-list section-block"
        onWheel={e => (listRef.current.scrollTop += e.deltaY * 0.3)}
        ref={listRef}
      >
        {renderList()}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
