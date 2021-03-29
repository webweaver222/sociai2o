import { getImageSize } from "utils";

const fetchProfile = (service) => (username) => (history) => async (
  dispatch
) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;
  try {
    const res = await service.getResource(`/profile/${username}`, token);

    const {
      user,
      friendsList,
      posts,
      isFriend,
      isRequestPending,
      isRequestSend,
    } = await res.json();

    if (!res.ok) {
    }

    if (user.avatarUrl) {
      const image = await getImageSize(user.avatarUrl);

      if (image.errorFetching) {
        user.avatarUrl = null;
      }

      if (image) {
        dispatch({ type: "PREPARE_AVATAR_CONTAINER", payload: image });
      }
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
          isRequestSend,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const avatarEncode = (popupFunction) => (file) => (dispatch) => {
  if (file && /image/.test(file.type)) {
    dispatch({ type: "SET_POPUP", payload: popupFunction });
    dispatch("START_ENCODE");

    var fileReader = new FileReader();

    fileReader.onload = async function (fileLoadedEvent) {
      const uri = fileLoadedEvent.target.result;

      const size = await getImageSize(uri);

      if (size) {
        dispatch({
          type: "SAVE_AVATAR_SIZE",
          payload: {
            width: size.width,
            height: size.height,
          },
        });
      }

      dispatch({ type: "SAVE_ENCODE", payload: uri });
    };

    fileReader.readAsDataURL(file);
  } else alert("Wrong File Format!");
};

const avatarUpload = (service) => async (dispatch, getState) => {
  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;
  const {
    photo: { base64 },
  } = getState();

  dispatch("START_ENCODE");

  try {
    const res = await service.postResource(
      { base64 },
      "/profile/avatar",
      token
    );

    const { url, size } = await res.json();

    console.log(size);

    dispatch({ type: "PREPARE_AVATAR_CONTAINER", payload: size });

    dispatch({ type: "AVATAR_UPLAOD_SUCCESS", payload: url });

    return dispatch("CLOSE_POPUP");
  } catch (e) {
    console.log(e);
  }
};

export { fetchProfile, avatarEncode, avatarUpload };
