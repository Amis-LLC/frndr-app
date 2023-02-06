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
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserMap, setHangoutMap, updateConnectionList, setThePage } from "../slices";
import getFromServer from "../utilities";
import BUTTON_TEXT from "../constants";
import Tile from "./Tile";

const Feed = (props) => {
  const userMap = useSelector((state) => state.frndr.userMap);
  const hangoutMap = useSelector((state) => state.frndr.hangoutMap);
  const connectionList = useSelector((state) => state.frndr.connectionList);
  const currentPage = useSelector(state => state.frndr.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    // on change of props
    // get feed to set hangoutMap
    console.log("updating... in useEffect");
    getFromServer(dispatch, setUserMap, `/api/users`); //get all user info
    getFromServer(dispatch, setHangoutMap, `/api/hangouts`); // get all hang outs
  }, [props]);

  const connectButtonClick = (obj) => {
    let options = {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: Number(obj._id),
        user_id: Number(obj.user_id),
      }),
    };
    let url = `/api/accept/`;

    if (
      [obj._id] in connectionList &&
      connectionList[obj._id].includes(String(obj.user_id))
    ) {
      // remove user from hangout...CANCEL
      options.method = "DELETE";
      url += obj.user_id;
    } else {
      options.method = "POST";
    }
    console.log(options);
    getFromServer(dispatch, updateConnectionList, url, options);
    return true;
  };

  const tiles = [];
  for (const _id in hangoutMap) {
    const hangout = hangoutMap[_id];
    const user = userMap[hangout.user_id];
    if (!user) continue;
    tiles.push(
      <Tile
        userID={user._id}
        hangID={_id}
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

  const handleClick = (page) => {
    dispatch(setThePage(page));
  };

  return <div>
    <button id = 'backToWelcome' onClick={() => handleClick('welcome')}>Back</button>
    <>{tiles}</>
    </div>;
};

export default Feed;
