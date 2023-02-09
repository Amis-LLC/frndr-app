import React, { useEffect } from 'react';

//this tile is the current user tile

function FeedTile(props) {
  console.log('props in feedtile', props);
  const { lat, lng, text, description, emojistring, status, creatorid } = props;

  return (
    <div className='tileBox'>
      {/* <img
        className='profile-pic'
        src={'../images/default-profile-pic.png'}
        alt={'random default'}
      ></img> */}
      <span className='hangoutBox' aria-label='hangout status'>
        <p className='status-text'>{text}</p>
        <p className='description-text'>{description}</p>

        {/* <div>"😊"</div> */}

        <button className='hangout-button' onClick={props.handleClick}>
          {`Make a Hang?`}
        </button>

        {/* <p className='location-text'>{location ? location : null}</p> */}
      </span>
    </div>
  );
}

export default FeedTile;
