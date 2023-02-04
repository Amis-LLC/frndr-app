import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import WelcomePage from './components/WelcomePage';
import Auth from "./Components/Auth.jsx" 

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Auth />
    )
  }
}

export default hot(App);
