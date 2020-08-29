const initialProfile = {
  data: {},
  relations: {},
  friends: {
    accepted: [],
    pending: []
  },
  posts: [],
  postInput: "",
  friendSearch: "",
  error: false,
  fetching: true,
  dropdown: false
};

const updateProfile = (state, action) => {
  if (typeof state === "undefined") return initialProfile;

  const { profile } = state;

  switch (action.type) {
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
        relations: action.relations,
        friends: {
          accepted: action.payload.friends.accepted,
          pending: action.payload.friends.pending
        },
        posts: action.payload.posts
      };
    }

    default:
      return profile;
  }
};

export default updateProfile;
