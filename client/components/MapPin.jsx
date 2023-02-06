/**
 * ************************************
 *
 * @module  MapPin.jsx
 * @author  Evan
 * @date
 * @description  renders a pin from another user on the map
 *
 * ************************************
 */

import React, { useEffect } from "react";
import Emoji from "./Emoji";
import { useSelector } from "react-redux";

const MapPin = (props) => {
  const connectionList = useSelector((state) => state.frndr.connectionList);

  const {
    location,
    emoji,
    buttonAction,
  } = props;

  return (
    <div className="map-marker" onClick={() => props.buttonAction()}>
      <span className="map-emoji" >{props.emoji}</span>
    </div>
  )
}
//onClick={() => handleClick('feed')
export default MapPin;
