import React from "react";
import { render } from "test-utils";
import user from "@testing-library/user-event";
import LoginContainer from "../components/login";

test("renders", () => {
  const { getByLabelText } = render(<LoginContainer />); // get the DOM node of that component

  const login = getByLabelText(/login/i);
  const password = getByLabelText(/password/i);
  user.type(login, "alex");
  user.type(password, "222333");
  expect(login).toHaveAttribute("value", "alex");
  expect(password).toHaveAttribute("value", "222333");
});
