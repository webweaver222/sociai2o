const tryLogin = service => history => (dispatch, getState) => {
  if (localStorage.getItem("sociaiUser")) {
    return dispatch({
      type: "LOAD_USER",
      payload: JSON.parse(localStorage.getItem("sociaiUser"))
    });
  }

  return history.push("/login");
};

const auth = service => history => async (dispatch, getState) => {
  const {
    auth: { email, password }
  } = getState();

  dispatch("AUTH_START");

  try {
    const res = await service.postResource({ email, password }, "/auth/signin");

    if (!res.ok) {
      return dispatch({
        type: "AUTH_FAIL",
        payload: `Error ${res.status}. ${res.statusText}`
      });
    }

    const { user } = await res.json();

    localStorage.setItem("sociaiUser", JSON.stringify(user));
    dispatch({ type: "AUTH_SUCCESS", payload: user });

    return history.push("/");
  } catch (e) {
    return dispatch({
      type: "AUTH_FAIL",
      payload: e.message
    });
  }
};

const signup = service => history => async (dispatch, getState) => {
  const {
    auth: { email, login, password }
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
          text: res.statusText
        }
      });
    }

    const { user } = await res.json();

    return dispatch({ type: "AUTH_SUCCESS", payload: user });
  } catch (e) {
    console.log(e);
  }
};

const fetchProfile = service => username => history => async dispatch => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.getResource(`/profile/${username}`, token);

    const {
      user,
      friendsList,
      posts,
      isFriend,
      isRequestPending,
      isRequestSend
    } = await res.json();

    if (!res.ok) {
    }

    console.log(friendsList);

    return dispatch({
      type: "PROFILE_FETCH_SUCCESS",
      payload: {
        data: user,
        friends: friendsList,
        posts: posts,
        relations: {
          isFriend,
          isRequestPending,
          isRequestSend
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export { tryLogin, auth, signup, fetchProfile };
