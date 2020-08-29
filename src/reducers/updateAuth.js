const initialUpdate = {
  user: null,
  signup: false,
  email: "",
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

  const {
    auth,
    auth: { signup }
  } = state;

  switch (action.type) {
    case "CHANGE_EMAIL_INPUT": {
      return {
        ...auth,
        email: action.payload
      };
    }

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

    case "CHANGE_AUTH_TYPE": {
      return {
        ...auth,
        signup: !signup
      };
    }

    case "AUTH_START": {
      return {
        ...auth,
        login_fetching: true
      };
    }

    case "AUTH_SUCCESS": {
      return {
        ...auth,
        user: action.payload
      };
    }

    case "AUTH_FAIL": {
      return {
        ...auth,
        auth_error: action.payload,
        login_fetching: false
      };
    }

    case "LOAD_USER": {
      return {
        ...auth,
        user: action.payload
      };
    }

    default:
      return auth;
  }
};

export default updateAuth;
