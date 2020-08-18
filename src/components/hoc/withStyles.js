import React from "react";

const withStyles = Wrapped => props => {
  return <Wrapped style={null} {...props} />;
};

export default withStyles;
