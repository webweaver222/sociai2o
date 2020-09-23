const initialProfile = {
  data: {},
  relations: {},
  friends: {
    accepted: [],
    pending: []
  },
  popupRender: null,
  shading: false,
  friendSearch: "",
  error: false,
  fetching: true,
  dropdown: false
};

const updateProfile = (state, action) => {
  if (typeof state === "undefined") return initialProfile;

  const { profile } = state;

  switch (action.type) {
    case "AVATAR_UPLAOD_SUCCESS": {
      return {
        ...profile,
        data: {
          ...profile.data,
          avatarUrl: action.payload
        }
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
        }
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

    case "FRIEND_SEARCH_CHANGE": {
      return {
        ...profile,
        friendSearch: action.payload
      };
    }

    case "SET_POPUP": {
      return {
        ...profile,
        popupRender: action.payload,
        shading: true
      };
    }

    case "CLOSE_POPUP": {
      return {
        ...profile,
        popupRender: null,
        shading: false
      };
    }

    default:
      return profile;
  }
};

export default updateProfile;
