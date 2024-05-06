import React from 'react';
// import Search from './Search';
import Chats from './Chats';

const Sidebar = ({contacts,currentUser ,changeChat}) => {
  return (
    <div className="sidebar">
      {/* <Search  /> */}
      <Chats contacts = {contacts} currentUser = {currentUser} changeChat = {changeChat} />
    </div>
  );
};

export default Sidebar;
