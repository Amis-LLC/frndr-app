import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import Header from './components/Header';
// import MainContainer from "./containers/MainContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default hot(App);
