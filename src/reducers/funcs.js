export const updateList = (list, newAdress, idx) => {
  if (list === null)
    return [
      {
        ...newAdress,
        id: 0
      }
    ];

  if (newAdress === "remove") {
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
  }

  if (typeof idx === "number") {
    return [...list.slice(0, idx), newAdress, ...list.slice(idx + 1)];
  }

  return [
    ...list,
    {
      id: Math.max(...list.map(p => p.id), 0) + 1,
      ...newAdress
    }
  ];
};
