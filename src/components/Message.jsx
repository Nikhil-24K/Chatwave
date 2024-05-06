import React from 'react';
import userimg from '../img/user.png';
import classNames from 'classnames';
import {v4 as uuidv4 } from "uuid";

const Message = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div>No messages to display</div>;
  }
  return (
    <div >
      {messages.map((message) => (
        <div className={classNames("message", { sent: message.fromSelf, received: !message.fromSelf })}  key={uuidv4()}>
          <div className="messageInfo">
            <img src={userimg} alt="user" style={{ maxWidth: '30px', maxHeight: '30px' }} />
          </div>
          <div className="messageContent">
            <p>{message.message}</p>
          </div>
        </div>

      ))}
    </div>
  );
};

export default Message;
