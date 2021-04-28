const tryLogin = (service) => (history) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("sociaiUser"));

  if (!user) {
    return history.push("/login");
  }

  return dispatch({ type: "LOAD_USER", payload: user });
};

const auth = (service) => (history) => async (dispatch, getState) => {
  const {
    auth: { email, password },
  } = getState();

  dispatch("AUTH_START");

  try {
    const res = await service.postResource({ email, password }, "/auth/signin");

    if (!res.ok) {
      return dispatch({
        type: "AUTH_FAIL",
        payload: `Error ${res.status}. ${res.statusText}`,
      });
    }

    const { user } = await res.json();

    localStorage.setItem("sociaiUser", JSON.stringify(user));
    dispatch({ type: "AUTH_SUCCESS", payload: user });

    return history.push(`/profile/${user.username}`);
  } catch (e) {
    return dispatch({
      type: "AUTH_FAIL",
      payload: e.message,
    });
  }
};

const signup = (service) => (history) => async (dispatch, getState) => {
  const {
    auth: { email, login, password },
  } = getState();

  dispatch("START_AUTH");

  try {
    const res = await service.postResource(
      { email, password, username: login },
      "/auth/signup"
    );

    if (!res.ok) {
      return dispatch({
        type: "AUTH_FAIL",
        payload: {
          status: res.status,
          text: res.statusText,
        },
      });
    }

    const { user } = await res.json();

    dispatch({ type: "AUTH_SUCCESS", payload: user });

    localStorage.setItem("sociaiUser", JSON.stringify(user));
    return history.push(`/profile/${user.username}`);
  } catch (e) {
    console.log(e);
  }
};

const logout = (service) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.postResource({}, "/auth/logout", token);
    if (res.ok) {
      localStorage.clear("sociaiUser");
      return dispatch("LOGOUT");
    }
  } catch (e) {}
};

export { tryLogin, auth, signup, logout };
