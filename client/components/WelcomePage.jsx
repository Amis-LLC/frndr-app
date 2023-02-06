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
import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Tile from "./Tile";
import MapPin from './MapPin';
import Footer from "./Footer";
import getFromServer from "../utilities";
import { setUserMap, setHangoutMap, updateConnectionList } from "../slices";
import BUTTON_TEXT from "../constants";

const WelcomePage = (props) => {
  const userMap = useSelector((state) => state.frndr.userMap);
  const hangoutMap = useSelector((state) => state.frndr.hangoutMap);
  const connectionList = useSelector((state) => state.frndr.connectionList);
  const dispatch = useDispatch();
  useEffect(() => {
    // on change of props
    // get feed to set hangoutMap
    console.log("updating... in useEffect");
    getFromServer(dispatch, setUserMap, `/api/users`); //get all user info
    getFromServer(dispatch, setHangoutMap, `/api/hangouts`); // get all hang outs
  }, [props]);
  
  const emojiIcon = "👨‍🍳"; // replace with state of emoji.
  // const emojiLabel = "chef"; // replace with state GROWTH

  // store all the map pins
  const pins = [];
  for (const _id in hangoutMap) {
    const hangout = hangoutMap[_id];
    const user = userMap[hangout.user_id];
    if (!user) continue;
    pins.push(
      <MapPin
        userID={user._id}
        hangID={_id}
        key={_id}
        phonenumber={user.phonenumber}
        email={user.email}
        profilepic={user.picture}
        location={hangout.location}
        statusname={hangout.statusname}
        emoji={hangout.picture}
        username={hangout.username}
        buttonText={
          //random text
          BUTTON_TEXT[Math.round(Math.random() * (BUTTON_TEXT.length - 1))]
        }
        buttonAction={() =>
          connectButtonClick({ _id, user_id: hangout.user_id })
        }
      />
    );
  }

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
        <div className="pins">{pins}</div>
        <Footer />
      </div>
    </>
  );
};

export default WelcomePage;
