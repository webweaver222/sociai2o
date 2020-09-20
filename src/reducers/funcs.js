export const getAvatarDim = (width, height, baseWidth, baseHeight) => {
  let w = width;
  let h = height;
  const k = width / height;

  if (k > 1) {
    if (width > baseWidth) {
      w = baseWidth;
      h = baseWidth / k;
    }
  } else {
    if (height > baseHeight) {
      h = baseHeight;
      w = baseHeight * k;
    }
  }

  return {
    width: w,
    height: h
  };
};

export const updatePosts = (list, item, idx) => {
  /*if (list === null)
    return [
      {
        ...newAdress,
        id: 0
      }
    ];*/

  if (item === "remove") {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  }

  if (typeof idx === "number") {
    return [...list.slice(0, idx), item, ...list.slice(idx + 1)];
  }

  return [item, ...list];
};
