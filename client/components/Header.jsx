import React from 'react';

// const Header = props => {
//     // grab the profile pic, hobby emoji/icon, and status text from the props and store in a variable?
//     // const { profile_pic, hobby_icon, status } = props.info;
    
//     return (
//         <div className="headerBox">
//             <img src="https://avatars.githubusercontent.com/u/94339613?v=4" alt="User profile picture" width="80px" height="80px"></img>
//             <p className="statusIcon">&#128512;</p>
//             <p>Looking to fight God in a Wendy's parking lot</p>
//         </div>
//     )
// }

const Header = props => {
    // set up state variable that dictates the visibility of the EmojiList component
    // (testing with a state variable for now because local variables don't persist between renders and because changes to local variables don't trigger re-renders)
    const [showEmojiList, setShowEmojiList] = React.useState(false);
  
    return (
      <div className="headerBox">
        <img src="https://avatars.githubusercontent.com/u/94339613?v=4" alt="User profile picture" width="80px" height="80px"></img>
        <p className="statusIcon" onClick={() => setShowEmojiList(!showEmojiList)}>&#128512;</p>
        <p>Looking to fight God in a Wendy's parking lot</p>
        {showEmojiList && (
          <div className="emojiListDropdown">
            <EmojiList closeDropdown={() => setShowEmojiList(false)} />
          </div>
        )}
      </div>
    );
  };
  
  const EmojiList = props => {
    return (
      <ul onClick={props.closeDropdown}>
        <li>&#128512;</li>
        <li>&#128514;</li>
        <li>&#128516;</li>
      </ul>
    );
  };
  
  

export default Header;
