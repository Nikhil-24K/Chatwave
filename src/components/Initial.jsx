import React from 'react'
import logo2 from '../img/logo2.png'

const Initial = ({currentUser}) => {

  if(!currentUser||!currentUser.username){
    return <div>Loading...</div>
  }

  return (
    <div className='initial'>
        <img src = {logo2} alt = "logo"/>
      <h1>Hi  <span>{currentUser.username} , </span>Welcome to ChatWave !</h1>
      <p>Start Texting.....</p>
    </div>
  );
}

export default Initial
