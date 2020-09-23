import { getAvatarDim } from "./funcs";

const initialPhoto = {
  fileEncode: false,
  base64: null,
  width: null,
  height: null,
  avatarWidth: null,
  avatarHeight: null
};

const updatePhoto = (state, action) => {
  if (typeof state === "undefined") return initialPhoto;

  const { photo } = state;

  switch (action.type) {
    case "PREPARE_AVATAR_CONTAINER": {
      const { width, height } = action.payload;

      const baseWidth = 300;
      const baseHeight = 400;

      const dim = getAvatarDim(width, height, baseWidth, baseHeight);

      return {
        ...photo,
        avatarWidth: dim.width,
        avatarHeight: dim.height
      };
    }

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

    case "CLOSE_POPUP": {
      return {
        ...photo,
        fileEncode: false
      };
    }

    case "SAVE_AVATAR_SIZE": {
      const { width, height } = action.payload;

      const baseWidth = 400;
      const baseHeight = 300;

      const dim = getAvatarDim(width, height, baseWidth, baseHeight);

      return {
        ...photo,
        width: dim.width,
        height: dim.height
      };
    }

    default:
      return photo;
  }
};

export default updatePhoto;
