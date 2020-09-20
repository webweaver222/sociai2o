const tryLogin = service => history => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("sociaiUser"));

  if (!user) {
    return history.push("/login");
  }

  return dispatch({ type: "LOAD_USER", payload: user });
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

    return history.push(`/profile/${user.username}`);
  } catch (e) {
    return dispatch({
      type: "AUTH_FAIL",
      payload: e.message
    });
  }
};

/*need update and refactor*/
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

const postMessage = service => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  const {
    timeline: { postInput: post }
  } = getState();

  try {
    const res = await service.postResource({ post }, "/post", token);

    if (res.ok) {
      return dispatch({ type: "POST_SUCCESS", payload: await res.json() });
    }
  } catch (e) {}
};

const postReply = service => parent_id => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  const {
    timeline: { replyInput: post }
  } = getState();

  try {
    const res = await service.postResource(
      { post, parent_id },
      "/post/reply",
      token
    );

    if (res.ok) {
      return dispatch({ type: "POST_SUCCESS", payload: await res.json() });
    }
  } catch (e) {
    console.log(e);
  }
};

const editPost = service => post_id => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  const {
    timeline: { editInput: text }
  } = getState();

  try {
    const res = await service.postResource(
      { text, post_id },
      "/post/edit",
      token
    );

    const post = await res.json();

    if (res.ok) {
      return dispatch({ type: "EDIT_SUCCESS", payload: post });
    }
  } catch (e) {}
};

const deletePost = service => id => async dispatch => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.postResource(
      { post_id: id },
      "/post/delete",
      token
    );

    const post = await res.json();

    return dispatch({ type: "POST_DELETE_SUCCESS", payload: post });
  } catch (e) {}
};

const logout = service => async dispatch => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.postResource({}, "/auth/logout", token);
    if (res.ok) {
      localStorage.clear("sociaiUser");
      return dispatch("LOGOUT");
    }
  } catch (e) {}
};

const addFriend = service => friend_id => async dispatch => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.postResource(
      { friend_id },
      "/friends/add",
      token
    );

    if (res.ok) {
      return dispatch("FRIEND_ADD_SUCCESS");
    }
  } catch (e) {
    console.log("Error", e);
  }
};

const acceptFriend = service => friend_id => async dispatch => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.postResource(
      { friend_id },
      "/friends/accept",
      token
    );

    if (res.ok) {
      return dispatch("FRIEND_ACCEPT_SUCCESS");
    }
  } catch (e) {}
};

const removeFriend = service => friend_id => async dispatch => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  try {
    const res = await service.postResource(
      { friend_id },
      "/friends/remove",
      token
    );

    if (res.ok) {
      return dispatch("FRIEND_REMOVE_SUCCESS");
    }
  } catch (e) {
    console.log("Error", e);
  }
};

const avatarEncode = popupFunction => file => (dispatch, getState) => {
  if (file && /image/.test(file.type)) {
    dispatch({ type: "SET_POPUP", payload: popupFunction });
    dispatch("START_ENCODE");

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      const uri = fileLoadedEvent.target.result;
      const i = new Image();

      i.onload = function () {
        dispatch({
          type: "SAVE_AVATAR_SIZE",
          payload: {
            width: i.width,
            height: i.height
          }
        });

        dispatch({ type: "SAVE_ENCODE", payload: uri });
      };

      i.src = uri;
    };

    fileReader.readAsDataURL(file);
  } else alert("Wrong File Format!");
};

const avatarUpload = service => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;
  const {
    photo: { base64 }
  } = getState();

  try {
    const res = await service.postResource(
      { base64 },
      "/profile/avatar",
      token
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export {
  tryLogin,
  auth,
  signup,
  fetchProfile,
  logout,
  postMessage,
  deletePost,
  postReply,
  addFriend,
  acceptFriend,
  removeFriend,
  editPost,
  avatarEncode,
  avatarUpload
};
