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
import WelcomePage from "./components/WelcomePage";
import Auth from "./components/Auth";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Auth />;
    // return <WelcomePage />;
  }
}

export default hot(App);
