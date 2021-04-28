const postMessage = (service) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  const {
    timeline: { postInput: post },
    auth,
  } = getState();

  try {
    const res = await service.postResource({ post }, "/post", token);

    if (res.ok) {
      const data = await res.json();
      return dispatch({
        type: "POST_SUCCESS",
        payload: {
          post: data,
          user: auth.user,
        },
      });
    }
  } catch (e) {}
};

const postReply = (service) => (parent_id) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  const {
    timeline: { replyInput: post },
    auth,
  } = getState();

  try {
    const res = await service.postResource(
      { post, parent_id },
      "/post/reply",
      token
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return dispatch({
        type: "POST_SUCCESS",
        payload: {
          post: data,
          user: auth.user,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const editPost = (service) => (post_id) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;

  const {
    timeline: { editInput: text },
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

const deletePost = (service) => (id) => async (dispatch) => {
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

export { postMessage, deletePost, postReply, editPost };
