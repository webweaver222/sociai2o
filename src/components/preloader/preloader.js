import React from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Preloader = ({ height = 20, width = 20, color = "#fff" }) => {
  return (
    <div className="preloader">
      <Loader
        type="TailSpin"
        color={color}
        height={height}
        width={width}
        //timeout={3000} //3 secs
      />
    </div>
  );
};

export default Preloader;
