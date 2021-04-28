import { updatePosts } from "./funcs";

const initialTimeline = {
  posts: [],
  postInput: "",
  replyInput: "",
  editInput: "",
  reply: null,
  postEdit: null,
};

const updateTimeline = (state, action) => {
  if (typeof state === "undefined") return initialTimeline;

  const {
    timeline,
    timeline: { posts },
  } = state;

  switch (action.type) {
    case "EDIT_SUCCESS": {
      if (action.payload.parent) {
        const parentIdx = posts.findIndex(
          (post) => post._id === action.payload.parent
        );

        const editIdx = posts[parentIdx].rep.findIndex(
          (post) => post._id === action.payload._id
        );

        return {
          ...timeline,
          editInput: "",
          postEdit: null,
          posts: updatePosts(
            posts,
            {
              ...posts[parentIdx],
              rep: updatePosts(
                posts[parentIdx].rep,
                {
                  ...posts[parentIdx].rep[editIdx],
                  body: action.payload.body,
                },
                editIdx
              ),
            },
            parentIdx
          ),
        };
      }

      const idx = posts.findIndex((post) => post._id === action.payload._id);

      return {
        ...timeline,
        editInput: "",
        postEdit: null,
        posts: updatePosts(
          posts,
          {
            ...posts[idx],
            body: action.payload.body,
          },
          idx
        ),
      };
    }

    case "POST_DELETE_SUCCESS": {
      if (action.payload.parent) {
        const parentIdx = posts.findIndex(
          (post) => post._id === action.payload.parent
        );

        const deleteIdx = posts[parentIdx].rep.findIndex(
          (post) => post._id === action.payload._id
        );

        return {
          ...timeline,
          posts: updatePosts(
            posts,
            {
              ...posts[parentIdx],
              rep: updatePosts(posts[parentIdx].rep, "remove", deleteIdx),
            },
            parentIdx
          ),
        };
      }

      const idx = posts.findIndex((post) => post._id === action.payload._id);
      console.log(idx);

      return {
        ...timeline,
        posts: updatePosts(posts, "remove", idx),
      };
    }

    case "OPEN_EDIT": {
      return {
        ...timeline,
        postEdit: action.payload,
      };
    }

    case "CLOSE_EDIT": {
      return {
        ...timeline,
        postEdit: null,
      };
    }

    case "OPEN_REPLY": {
      return {
        ...timeline,
        reply: action.payload,
        replyInput: "",
      };
    }

    case "CLOSE_REPLY": {
      return {
        ...timeline,
        reply: null,
        replyInput: "",
      };
    }

    case "CHANGE_REPLY_INPUT": {
      return {
        ...timeline,
        replyInput: action.payload,
      };
    }

    case "CHANGE_EDIT_INPUT": {
      return {
        ...timeline,
        editInput: action.payload,
      };
    }

    case "CHANGE_POST_INPUT": {
      return {
        ...timeline,
        postInput: action.payload,
      };
    }
    case "POST_SUCCESS": {
      const newPost = {
        ...action.payload.post,
        user: action.payload.user,
      };

      if (action.payload.post.parent) {
        const parent_idx = posts.findIndex(
          (post) => post._id === action.payload.post.parent._id
        );

        return {
          ...timeline,
          replyInput: "",
          reply: null,
          posts: updatePosts(
            posts,
            {
              ...posts[parent_idx],
              rep: updatePosts(posts[parent_idx].rep, newPost),
            },
            parent_idx
          ),
        };
      }

      return {
        ...timeline,
        postInput: "",
        posts: updatePosts(posts, newPost),
      };
    }

    case "PROFILE_FETCH_SUCCESS": {
      return {
        ...timeline,
        posts: action.payload.posts,
      };
    }

    default:
      return timeline;
  }
};

export default updateTimeline;
