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

const Chatroom = (props) => {
  console.log("chatroom rendered");
  // userMap will contain: // {_id : {_id, statusName, firstName, lastName, phoneNumber,email, username, location, statusname, picture}
  const userMap = useSelector((state) => state.frndr.userMap);
  // use useState to create local state

  const [inputValue, setInputValue] = useState("");
  const [messages, addMessages] = useState([" "]);

  //   const messages = document.getElementById("messages");
  //   const form = document.getElementById("form");
  //   const input = document.getElementById("input");

  // listen for incoming messages and put them on the DOM tree
  const messagesArray = [];
  socket.on("chat message", (msg) => {
    console.log("client-side chat message received: ", msg);
    // console.log(messages);
    const tempArray = [];
    tempArray.push(msg);
    messages.push(tempArray[tempArray.length - 1]);
    console.log(messages);
    addMessages(messages);
  });

  // QUESTIONS:
  //- why are we getting multiple server-side websocket emissions from a single client side emission
  // why is the initially declared message being rendered as a div, but not additional messages => useEffect?

  return (
    <div className="chatBox">
      <ul id="messages">
        {messages.map((el, i) => (
          <li key={i}>{el}</li>
        ))}
      </ul>

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
  );
};

export default Chatroom;
