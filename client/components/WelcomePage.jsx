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
import Tile from "./Tile";
import Footer from "./Footer";

const WelcomePage = (props) => {
  const emojiIcon = "👨‍🍳"; // replace with state of emoji.
  // const emojiLabel = "chef"; // replace with state GROWTH

  return (
    <>
      <Tile
        username="evan"
        className="headerBox"
        profilepic={require("../images/evan.png")}
        statusname="Looking to fight God in a Wendy's parking lot"
        emoji={emojiIcon}
        buttonAction={() => false}
        buttonText="Make a Hang?"
        btnDisabled={true}
      />
      <div className="map-box">
        <img
          className="map-image"
          src={require("../images/map-milford.png")}
          alt="image host"
        />
        <Footer />
      </div>
    </>
  );
};

export default WelcomePage;
