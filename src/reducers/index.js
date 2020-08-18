import updateAuth from "./updateAuth";

const reducer = (state, action) => {
  return {
    auth: updateAuth(state, action)
  };
};

export default reducer;
