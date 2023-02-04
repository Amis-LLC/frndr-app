/**
 * ************************************
 *
 * @module  WelcomPage.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import React, { Component } from "react";
import Header from "./Header";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <img
          className="map-image"
          src={require("../images/map-milford.png")}
          alt="image host"
        />
      </div>
    );
  }
}

export default WelcomePage;
