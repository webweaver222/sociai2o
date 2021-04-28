const createSocket = (ws) => (history) => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState();

  const token = JSON.parse(localStorage.getItem("sociaiUser")).token;
  console.log(token);

  ws.init(token);

  const { socket } = ws;

  socket.addEventListener("message", async ({ data }) => {
    const msg = JSON.parse(data);
    console.log(msg.payload.post);
    switch (msg.type) {
      case "FRIEND_POST": {
        return dispatch({ type: "POST_SUCCESS", payload: msg.payload });
      }

      case "FRIEND_REPLY": {
        return dispatch({ type: "POST_SUCCESS", payload: msg.payload });
      }

      case "FRIEND_POST_DELETE": {
        return dispatch({
          type: "POST_DELETE_SUCCESS",
          payload: msg.payload.post,
        });
      }
    }
  });
};

const closeConn = (ws) => (history) => async (dispatch, getState) => {
  const { socket } = ws;

  socket.close(1000);
};

export { createSocket, closeConn };
