import updateAuth from "./updateAuth";
import updateProfile from "./updateProfile";

const reducer = (state, action) => {
  return {
    auth: updateAuth(state, action),
    profile: updateProfile(state, action)
  };
};

export default reducer;
