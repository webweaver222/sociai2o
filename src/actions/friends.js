const addFriend = (service) => (friend_id) => async (dispatch) => {
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

const acceptFriend = (service) => (friend_id) => async (dispatch) => {
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

const removeFriend = (service) => (friend_id) => async (dispatch) => {
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

export { addFriend, acceptFriend, removeFriend };
