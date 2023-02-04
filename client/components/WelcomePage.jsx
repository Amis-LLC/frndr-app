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
import Footer from "./Footer";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="map-box">
          <img
            className="map-image"
            src={require("../images/map-milford.png")}
            alt="image host"
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default WelcomePage;
