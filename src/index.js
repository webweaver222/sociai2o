import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./resources/vars.sass";
import "./resources/reset.sass";
import "./resources/main.sass";

import ErrorBoundry from "./components/error-boundry";
import { ServiceProvider } from "./components/service-provider";
import App from "./components/app";

import diviaiService from "./services/diviaiApi";
import SocketWrapper from "./services/ws";
import store from "./store";

const container = {
  api: new diviaiService("http://localhost:3000"),
  socket: new SocketWrapper("ws://localhost:3000/"),
};

const history = createBrowserHistory({
  basename: "sociai",
});

ReactDom.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ServiceProvider value={container}>
        <Router history={history}>
          <App />
        </Router>
      </ServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
