import updateAuth from "./updateAuth";
import updateProfile from "./updateProfile";
import updatePhoto from "./updatePhoto";
import updateTimeline from "./updateTimeline";

const reducer = (state, action) => {
  return {
    auth: updateAuth(state, action),
    profile: updateProfile(state, action),
    photo: updatePhoto(state, action),
    timeline: updateTimeline(state, action)
  };
};

export default reducer;
