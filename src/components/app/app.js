import React from "react";

import "./app.sass";
import bgc from "../../resources/svg/background.html";

//import Preloader from '../preloader'

import Login from "../login";
import Profile from "../Profile";

const App = () => {
  return (
    <div className="app">
      <Profile />
      <div className="background" dangerouslySetInnerHTML={{ __html: bgc }} />
    </div>
  );
};

export default App;
