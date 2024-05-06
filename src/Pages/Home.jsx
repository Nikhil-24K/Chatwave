import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute , host } from '../utils/APIRoutes';
import Initial from '../components/Initial';
import {io} from "socket.io-client";

const Home = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("chat-app-user")) {
          navigate("/");
        } else {
          const userData = JSON.parse(localStorage.getItem("chat-app-user"));
          setCurrentUser(userData);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    if (currentUser) {
      fetchContactData();
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="home">
      <div className="container">
        <Navbar />
        <Sidebar contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined ? (
          <Initial currentUser={currentUser} />
        ) : (
          <Chat currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </div>
  );
};

export default Home;
