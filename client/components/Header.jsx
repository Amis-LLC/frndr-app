import React from 'react';

const Header = props => {
    return (
        <div className="headerBox">
            <img src="https://avatars.githubusercontent.com/u/94339613?v=4" alt="User profile picture" width="80px" height="80px"></img>
            <p className="statusIcon">&#128512;</p>
            <p>Looking to fight someone in a Wendy's parking lot</p>
        </div>
    )
}

export default Header;