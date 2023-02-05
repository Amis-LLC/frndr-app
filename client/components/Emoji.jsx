/**
 * ************************************
 *
 * @module  Emoji.jsx
 * @author
 * @date
 * @description render an ARIA compliant emoji
 *
 * ************************************
 */
import React from "react";

const Emoji = (props) => {
  const emojiRegex = /\p{Extended_Pictographic}/u;
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {emojiRegex.test(props.symbol) ? props.symbol : "😊"}
    </span>
  );
};
export default Emoji;
