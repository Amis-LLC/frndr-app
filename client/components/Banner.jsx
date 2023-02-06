/**
 * ************************************
 *
 * @module  Banner.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import React from "react";

const Banner = (props) => {
  return (
    <div className="banner">
      <img
        className="logo"
        src={require("../images/logo.png")}
        alt="Welcome to FRNDR, the friend finder"
      ></img>
    </div>
  );
};

export default Banner;
