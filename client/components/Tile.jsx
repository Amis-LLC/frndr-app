import React, { useEffect } from 'react';

//this tile is the current user tile

function Tile(props) {
  const {
    _id,
    firstname,
    lastname,
    phonenumber,
    email,
    username,
    location,
    profilepicture,
    acceptedhangoutsid,
  } = props.userData;
  //   const acceptHangout = (e) => {
  //     e.preventDefault();
  //     if (buttonAction()) {
  //       e.currentTarget.classList.toggle("on");
  //     }
  //   };
  let evan = '../images/evan.png';
  console.log(props);
  return (
    <div className='tileBox'>
      <img
        className='profile-pic'
        src={profilepicture ? profilepicture : require('../images/evan.png')}
        alt={username}
      ></img>
      <span className='hangoutBox' aria-label='hangout status'>
        <p className='status-text'>{`${username} wants to hang out at ${location}`}</p>
        <button className='hangout-button' onClick={props.handleClick}>
          {`Make a Hang?`}
        </button>
        <p className='location-text'>{location ? location : null}</p>
      </span>
    </div>
  );
}

export default Tile;
