import React from 'react'
import logo2 from "../img/logo2.png"
import userimg from '../img/user.png'

const Navbar = () => {

  const handleLogout=()=>{
    localStorage.removeItem('chat-app-user');
    window.location.href='/';
  };
    
  return (
    <div className="navbar">
         <img className = "logo" src = {logo2} alt = "" style={{ maxWidth: '100px', maxHeight: '70px' }}></img>
        <div className = "tools">
            
            <div className="softtools">
               <div className="displaypic">
               <img src = {userimg} alt = "" ></img>
              </div> 
            {/* <span className="material-symbols-outlined">forum</span>
            <span className="material-symbols-outlined">feed</span> */}
            </div> 
            <div className="hardtools">
            <span className="material-symbols-outlined">settings</span>
            <span className="material-symbols-outlined" onClick={handleLogout}>logout</span>
            </div>

        </div>
    </div>
  )
}

export default Navbar
