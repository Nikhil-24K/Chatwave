import React  from 'react';
import userimg from '../img/user.png'


const Search = () => {


  return (
    <div className="search">
      <div className="searchForm">
        <input
          className="search-bar"
          type="text"
          name="searchUser"
          placeholder="Search user"
        />
      </div>

        <div  className="userChat" >
          <div className="userChatInfo">
          <img src = {userimg} alt = "user1"  style={{ maxWidth: '50px', maxHeight: '50px' }} />
            <span>Nikhil</span>
          </div>
        </div>
    </div>
  );
};

export default Search;
