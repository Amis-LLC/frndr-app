/**
 * ************************************
 *
 * @module  Header.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import React from "react";
import Emoji from "./Emoji";

const Header = (props) => {
  // grab the profile pic, hobby emoji/icon, and status text from the props and store in a variable?
  // const { profile_pic, hobby_icon, status } = props.info;
  const emojiIcon = "👨‍🍳"; // replace with state of emoji.
  return (
    <div className="headerBox">
      <img
        className="profile-pic"
        src={require("../images/evan.png")}
        alt="User profile picture"
      ></img>
      <Emoji symbol={emojiIcon} /*label="<emoji description>"*/ />
      <p className="status-text">
        Looking to fight God in a Wendy's parking lot
      </p>
    </div>
  );
};

export default Header;
