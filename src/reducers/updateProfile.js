import { updatePosts } from "./funcs";

const initialProfile = {
  data: {},
  relations: {},
  friends: {
    accepted: [],
    pending: []
  },
  posts: [],
  postInput: "",
  replyInput: "",
  editInput: "",
  reply: null,
  postEdit: null,
  friendSearch: "",
  error: false,
  fetching: true,
  dropdown: false
};

const updateProfile = (state, action) => {
  if (typeof state === "undefined") return initialProfile;

  const {
    profile,
    profile: { posts },
    auth
  } = state;

  switch (action.type) {
    case "EDIT_SUCCESS": {
      if (action.payload.parent) {
        const parentIdx = posts.findIndex(
          post => post._id === action.payload.parent
        );

        const editIdx = posts[parentIdx].rep.findIndex(
          post => post._id === action.payload._id
        );

        return {
          ...profile,
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
                  body: action.payload.body
                },
                editIdx
              )
            },
            parentIdx
          )
        };
      }

      const idx = posts.findIndex(post => post._id === action.payload._id);
      console.log(action.payload);

      return {
        ...profile,
        editInput: "",
        postEdit: null,
        posts: updatePosts(
          posts,
          {
            ...posts[idx],
            body: action.payload.body
          },
          idx
        )
      };
    }

    case "POST_DELETE_SUCCESS": {
      if (action.payload.parent) {
        const parentIdx = posts.findIndex(
          post => post._id === action.payload.parent
        );

        const deleteIdx = posts[parentIdx].rep.findIndex(
          post => post._id === action.payload._id
        );

        return {
          ...profile,
          posts: updatePosts(
            posts,
            {
              ...posts[parentIdx],
              rep: updatePosts(posts[parentIdx].rep, "remove", deleteIdx)
            },
            parentIdx
          )
        };
      }

      const idx = posts.findIndex(post => post._id === action.payload._id);

      return {
        ...profile,
        posts: updatePosts(posts, "remove", idx)
      };
    }

    case "POST_SUCCESS": {
      const newPost = {
        ...action.payload,
        user: auth.user
      };

      if (action.payload.parent) {
        const parent_idx = posts.findIndex(
          post => post._id === action.payload.parent._id
        );

        return {
          ...profile,
          replyInput: "",
          reply: null,
          posts: updatePosts(
            posts,
            {
              ...posts[parent_idx],
              rep: updatePosts(posts[parent_idx].rep, newPost)
            },
            parent_idx
          )
        };
      }

      return {
        ...profile,
        postInput: "",
        posts: updatePosts(posts, newPost)
      };
    }

    case "SHOW_DROPDOWN": {
      return {
        ...profile,
        dropdown: true
      };
    }

    case "HIDE_DROPDOWN": {
      return {
        ...profile,
        dropdown: false
      };
    }

    case "CHANGE_POST_INPUT": {
      return {
        ...profile,
        postInput: action.payload
      };
    }

    case "CHANGE_EDIT_INPUT": {
      return {
        ...profile,
        editInput: action.payload
      };
    }

    case "CHANGE_FRIEND_SEARCH": {
      return {
        ...profile,
        friendSearch: action.payload
      };
    }

    case "PROFILE_FETCH_SUCCESS": {
      return {
        ...profile,
        fetching: false,
        data: action.payload.data,
        relations: action.payload.relations,
        friends: {
          accepted: action.payload.friends.accepted,
          pending: action.payload.friends.pending
        },
        posts: action.payload.posts
      };
    }

    case "OPEN_EDIT": {
      return {
        ...profile,
        postEdit: action.payload
      };
    }

    case "CLOSE_EDIT": {
      return {
        ...profile,
        postEdit: null
      };
    }

    case "OPEN_REPLY": {
      return {
        ...profile,
        reply: action.payload,
        replyInput: ""
      };
    }

    case "CLOSE_REPLY": {
      return {
        ...profile,
        reply: null,
        replyInput: ""
      };
    }

    case "CHANGE_REPLY_INPUT": {
      return {
        ...profile,
        replyInput: action.payload
      };
    }

    case "LOGOUT": {
      return {
        ...profile,
        fetching: true
      };
    }

    case "FRIEND_REMOVE_SUCCESS": {
      return {
        ...profile,
        relations: {
          ...profile.relations,
          isFriend: false
        }
      };
    }

    case "FRIEND_ADD_SUCCESS": {
      return {
        ...profile,
        relations: {
          ...profile.relations,
          isRequestSend: true
        }
      };
    }

    case "FRIEND_ACCEPT_SUCCESS": {
      return {
        ...profile,
        relations: {
          ...profile.relations,
          isRequestPending: false,
          isFriend: true
        }
      };
    }

    default:
      return profile;
  }
};

export default updateProfile;
