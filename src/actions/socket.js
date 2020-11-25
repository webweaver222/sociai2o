import io from "socket.io-client";

export const socket = (service) => (history) => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  const socket = io.connect(window.location.origin, {
    path: "/diviai/socket.io",
  });

  socket.emit("join", { username: user.username });

  socket.on("test", function (msg) {
    console.log(msg);
  });
};
