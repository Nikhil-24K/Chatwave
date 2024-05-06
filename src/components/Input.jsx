import React, { useState } from 'react';
import logo2 from "../img/logo2.png";
import Picker from "emoji-picker-react";

const Input = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const [msg, setMsg] = useState("");

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg('');
    }
  }

  
  return (
    <div className="input">
      <form onSubmit = {(e)=>sendChat(e)}  >
      <input
        type="text"
        placeholder="Type Something...."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <div className="send">
        <span className="material-symbols-outlined" onClick={handleEmojiPickerhideShow}>
          add_reaction
        </span>
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        <button type='submit'>
          <img
            className="logo"
            src={logo2}
            alt=""
            style={{ maxWidth: '50px', maxHeight: '40px' }}
          ></img>
        </button>
      
      </div>
      </form>
    </div>
  );
};

export default Input;
