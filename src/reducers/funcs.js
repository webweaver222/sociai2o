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
