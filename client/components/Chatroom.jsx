/**
 * ************************************
 *
 * @module  Chatroom.jsx
 * @author Evan and Rebecca
 * @date
 * @description render Chatroom
 *
 * ************************************
 */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io();

// create two new state properties, msgSent and msgReceived
// inside onClick method, set msgSent to inputValue
// inside socket.on, set msgReceived to msg;
// inside map function, set conditional: if msgSent === msgReceived, create the same div but with a className ownMessage
// in styling, set ownMessage to style differently (background color, alignment)

const Chatroom = (props) => {
  console.log("chatroom rendered");
  // userMap will contain: // {_id : {_id, statusName, firstName, lastName, phoneNumber,email, username, location, statusname, picture}
  const userMap = useSelector((state) => state.frndr.userMap);

  // use useState to create local state
  const [inputValue, setInputValue] = useState("");
  const [messages, addMessages] = useState(["hello"]);

  // listen for incoming messages and update state
  socket.on("chat message", (msg) => {
    // console.log("client-side chat message received: ", msg);
    if (messages[messages.length - 1] !== msg) {
      const newArray = [...messages];
      newArray.push(msg);
      addMessages(newArray);
    }
  });

  // QUESTIONS:
  //- why are we getting multiple server-side websocket emissions from a single client side emission
  // why is the initially declared message being rendered as a div, but not additional messages => useEffect?
  // multiple messages could be because there are multiple instances of local server

  return (
    <div className="chatBox">
      <div id="messages">
        {messages.map((el, i) => (
          <p key={i} className="chatBox-li">
            {el}
          </p>
        ))}
      </div>

      <div id="anchor"></div>

      <div className="input-button">
        <input
          id="input"
          type="text"
          name="input"
          value={inputValue}
          //   autoComplete="off"
          onChange={(e) => {
            setInputValue(e.target.value);
            //   console.log(inputValue);
          }}
        />
        <button
          onClick={(e) => {
            const msg = inputValue;
            socket.emit("chat message", msg);
            setInputValue("");
          }}
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Chatroom;
