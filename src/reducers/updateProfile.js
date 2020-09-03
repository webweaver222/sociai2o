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
  reply: null,
  friendSearch: "",
  error: false,
  fetching: true,
  dropdown: false
};

const updateProfile = (state, action) => {
  if (typeof state === "undefined") return initialProfile;

  const { profile, auth } = state;

  switch (action.type) {
    case "POST_SUCCESS": {
      const newPost = {
        ...action.payload,
        user: auth.user
      };

      return {
        ...profile,
        posts: updatePosts(profile.posts, newPost)
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
