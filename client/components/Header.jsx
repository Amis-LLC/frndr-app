import React from 'react';

const Header = props => {
    // grab the profile pic, hobby emoji/icon, and status text from the props and store in a variable?
    // const { profile_pic, hobby_icon, status } = props.info;
    
    return (
        <div className="headerBox">
            <img src="https://avatars.githubusercontent.com/u/94339613?v=4" alt="User profile picture" width="80px" height="80px"></img>
            <p className="statusIcon">&#128512;</p>
            <p>Looking to fight God in a Wendy's parking lot</p>
        </div>
    )
}

export default Header;
