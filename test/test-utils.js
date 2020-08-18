import React from "react";
import { ServiceProvider } from "../src/components/service-provider";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { middlewares } from "../src/store";
import { initState, reducer } from "../src/reducers";
import mockApi from "./api-mock";

function render(
  ui,
  {
    initialState = initState,
    resolveTo,
    store = createStore(reducer, initialState, applyMiddleware(...middlewares)),
    ...options
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ServiceProvider value={mockApi(resolveTo)}>
          <Router>{children}</Router>
        </ServiceProvider>
      </Provider>
    );
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options
  });
}

export * from "@testing-library/react";

export { render };
