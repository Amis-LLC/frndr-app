/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
// import WelcomePage from "./components/WelcomePage";
import Feed from "./components/Feed";
// import Auth from "./components/Auth";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // return <Auth />;
    // return <WelcomePage />;
    return <Feed />;
  }
}

export default hot(App);
