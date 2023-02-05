/**
 * ************************************
 *
 * @module  Tile.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import React, { useEffect } from "react";
import Emoji from "./Emoji";
import { useSelector } from "react-redux";

// input: props with a hangoutObj
//  = {location, statusname, picture, username}
const Tile = (props) => {
  const connectionList = useSelector((state) => state.frndr.connectionList);

  const {
    userID,
    hangID,
    phonenumber,
    email,
    profilepic,
    location,
    statusname,
    emoji,
    username,
    buttonText,
    buttonAction,
    btnDisabled,
    className,
  } = props;
  const acceptHangout = (e) => {
    e.preventDefault();
    if (buttonAction()) {
      e.currentTarget.classList.toggle("on");
    }
  };
  return (
    <div className={className ? className : "tileBox"}>
      <img
        className="profile-pic"
        src={
          profilepic.search(/https?:\/\//)
            ? profilepic
            : profilepic.search(/\.(jpe?g|png)/)
            ? profilepic
            : require("../images/default-profile-pic.png")
        }
        alt={username}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = require("../images/default-profile-pic.png");
        }}
      ></img>
      <Emoji symbol={emoji} /*label="<emoji description>"*/ />
      <span className="hangoutBox" aria-label="hangout status">
        <p className="status-text">{statusname}</p>
        <button
          className="hangout-button"
          onClick={acceptHangout}
          disabled={btnDisabled ? btnDisabled : false}
        >
          {hangID &&
          connectionList[hangID] &&
          connectionList[hangID].includes(String(userID))
            ? `Phone: ${phonenumber}`
            : `${buttonText}`}
        </button>
        <p className="location-text">{location ? location : null}</p>
      </span>
    </div>
  );
};

export default Tile;
