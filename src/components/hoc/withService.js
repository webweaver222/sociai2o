import React from "react";

import { ServiceConsumer } from "../service-provider";

const withService = (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {({ api }) => {
          return <Wrapped {...props} service={api} />;
        }}
      </ServiceConsumer>
    );
  };
};

const withSocket = (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {({ socket }) => {
          return <Wrapped {...props} socket={socket} />;
        }}
      </ServiceConsumer>
    );
  };
};

export { withService, withSocket };
