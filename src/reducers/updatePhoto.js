const initialPhoto = {
  fileEncode: false,
  base64: null,
  width: null,
  height: null
};

const updatePhoto = (state, action) => {
  if (typeof state === "undefined") return initialPhoto;

  const { photo } = state;

  switch (action.type) {
    case "START_ENCODE": {
      return {
        ...photo,
        fileEncode: true
      };
    }

    case "SAVE_ENCODE": {
      return {
        ...photo,
        base64: action.payload,
        fileEncode: false
      };
    }

    case "SAVE_AVATAR_SIZE": {
      const { width, height } = action.payload;
      return {
        ...photo,
        width,
        height
      };
    }

    default:
      return photo;
  }
};

export default updatePhoto;
