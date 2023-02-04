import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import WelcomePage from './components/WelcomePage';
// import MainContainer from "./containers/MainContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WelcomePage />
      </div>
    )
  }
}

export default hot(App);
