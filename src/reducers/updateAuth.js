const initialUpdate = {
  session_key: undefined,
  login: "",
  password: "",
  component_fetching: false,
  login_fetching: false,
  auth_error: null,
  valid_errors: {}
};

const updateAuth = (state, action) => {
  if (typeof state === "undefined") {
    return initialUpdate;
  }

  const { auth } = state;

  switch (action.type) {
    case "CHANGE_LOGIN_INPUT": {
      return {
        ...auth,
        login: action.payload
      };
    }

    case "CHANGE_PASS_INPUT": {
      return {
        ...auth,
        password: action.payload
      };
    }

    default:
      return auth;
  }
};

export default updateAuth;
