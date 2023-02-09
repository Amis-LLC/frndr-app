import React, { useEffect } from "react";
import Emoji from "./Emoji";

function FeedTile(props) {
  const {
    _id,
    title,
    description,
    markerimg,
    lat,
    lng,
    emojistring,
    status,
    creatorid,
    handleClick,
  } = props;
  //   const acceptHangout = (e) => {
  //     e.preventDefault();
  //     if (buttonAction()) {
  //       e.currentTarget.classList.toggle("on");
  //     }
  //   };

  return (
    <div className="tileBox">
      <img
        className="marker-pic"
        src={
          profilepicture
            ? profilepicture
            : require("../images/default-profile-pic.png")
        }
        alt={username}
      ></img>
      <Emoji symbol={emojistring} />
      <span className="hangoutBox" aria-label="hangout status">
        <p>{title}</p>
        <p>{description}</p>
        <button className="hangout-button" onClick={handleClick}>
          {`Accept Hang?`}
        </button>
        {/* <p className="location-text">{location ? location : null}</p> */}
      </span>
    </div>
  );
}

export default FeedTile;
