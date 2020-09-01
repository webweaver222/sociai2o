import io from "socket.io-client";

export const socket = service => history => async (dispatch, getState) => {
  const {
    auth: { user }
  } = getState();

  //const socket = io("http://localhost:3000");

  //socket.emit("join", { username: user.username });

  /*socket.on("test", function (msg) {
    console.log(msg);
  });*/
};
