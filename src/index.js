import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./resources/vars.sass";
import "./resources/reset.sass";
import "./resources/main.sass";
import "./resources/media.sass";

import ErrorBoundry from "./components/error-boundry";
import { ServiceProvider } from "./components/service-provider";
import App from "./components/app";

import diviaiService from "./services/diviaiApi";
import store from "./store";

const history = createBrowserHistory({
  basename: "sociai",
});

const service = new diviaiService();

ReactDom.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ServiceProvider value={service}>
        <Router history={history}>
          <App />
        </Router>
      </ServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
