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

import React from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io();

const Chatroom = (props) => {
  // userMap will contain: // {_id : {_id, statusName, firstName, lastName, phoneNumber,email, username, location, statusname, picture}
  const userMap = useSelector((state) => state.frndr.userMap);

  const localState = {
    inputValue: "",
    messages: [],
  };

  //   const messages = document.getElementById("messages");
  //   const form = document.getElementById("form");
  //   const input = document.getElementById("input");

  // listen for incoming messages and put them on the DOM tree
  socket.on("chat message", (msg) => {
    console.log("client-side chat message received: ", msg);
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
  });

  return (
    <div className="chatBox">
      <ul id="messages"></ul>

      <input
        id="input"
        type="text"
        name="input"
        value={localState.inputValue}
        //   autoComplete="off"
        onChange={(e) => {
          localState.inputValue += e.target.value;
          console.log(localState.inputValue);
        }}
      />
      <button
        onClick={(e) => {
          const msg = localState.inputValue;
          socket.emit("chat message", msg);
          localState.inputValue = "";
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chatroom;
