import React, { useState } from 'react';
import userimg from '../img/user.png';

const Chats = ({ contacts, currentUser, changeChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const otherContacts = contacts.filter(contact => contact._id !== currentUser._id);

  const changeCurrentChat = (index, contact) => {
    if (index !== currentSelected) {
      setCurrentSelected(index);
      changeChat(contact);
    }
  };

  return (
    <div className="chats">
      <h1>Chats</h1>
      {otherContacts.map((contact, index) => (
        <div
          className={`userChat ${index === currentSelected ? 'selected' : ''}`}
          key={index} 
          onClick={() => changeCurrentChat(index, contact)}
        >
          <img src={userimg} alt={`user${index}`} />
          <div className="userChatInfo">
            <span>{contact.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
