/**
 * ************************************
 *
 * @module  Feed.jsx
 * @author
 * @date
 * @description render Hangout Feed
 *
 * ************************************
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserMap,
  setHangoutMap,
  updateConnectionList,
  setThePage,
} from "../slices";
import getFromServer from "../utilities";
import BUTTON_TEXT from "../constants";
import Tile from "./Tile";
import FeedTile from "./FeedTile";

const Feed = (props) => {
  // const userMap = useSelector((state) => state.frndr.userMap);
  // const selectID = useSelector((state) => state.frndr.userMap);
  // const hangoutMap = useSelector((state) => state.frndr.hangoutMap);
  // const connectionList = useSelector((state) => state.frndr.connectionList);
  // const currentPage = useSelector((state) => state.frndr.currentPage);
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    // on change of props
    // get feed to set hangoutMap
    console.log("updating... in useEffect");
    // getFromServer(dispatch, setUserMap, `/api/users`); //get all user info and set it in state
    // getFromServer(dispatch, setHangoutMap, `/api/hangouts`); // get all hang outs

    //get all users
    fetch(`/api/allusers`)
      .then((data) => data.json())
      .then((data) => setAllUsers([...data]))
      .catch((err) => console.log(err));

    //get all hangouts
    // fetch(`/api/allusers`)
    //   .then((data) => data.json())
    //   .then((data) => setAllUsers([...data]))
    //   .catch((err) => console.log(err));

    //get all users for hangouts using foreign key
  }, []);

  // const connectButtonClick = (obj) => {
  //   //put request to change user hangoutId to current hangoutId
  //   let options = {
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       _id: Number(obj._id),
  //       user_id: Number(obj.user_id),
  //     }),
  //   };
  //   let url = `/api/accept/`;

  //   if (
  //     [obj._id] in connectionList &&
  //     connectionList[obj._id].includes(String(obj.user_id))
  //   ) {
  //     // remove user from hangout...CANCEL
  //     options.method = "DELETE";
  //     url += obj.user_id;
  //   } else {
  //     options.method = "POST";
  //   }
  //   console.log(options);
  //   getFromServer(dispatch, updateConnectionList, url, options);
  //   return true;
  // };

  //get hangouts array
  //for every hangout in hangouts array
  //return tile with info
  //tile needs button to accept hang (function connectButtonClick)
  const tiles = [];
  for (const user of allUsers) {
    tiles.push(
      <FeedTile
        userID={user._id}
        hangID={acceptedhangoutsid}
        phonenumber={user.phonenumber}
        email={user.email}
        profilepic={user.profilepicture}
        buttonText={
          //random text
          BUTTON_TEXT[Math.round(Math.random() * (BUTTON_TEXT.length - 1))]
        }
        // buttonAction={() =>
        //   connectButtonClick({ _id, user_id: hangout.user_id })
        // }
      />
    );
  }
  // location={hangout.location}
  // username={hangout.username}
  //after you get hangouts, match them up

  const handleClick = (page) => {
    dispatch(setThePage(page));
  };

  return (
    <div>
      <button id="backToWelcome" onClick={() => handleClick("welcome")}>
        Back
      </button>
      <>{tiles}</>
    </div>
  );
};

export default Feed;
