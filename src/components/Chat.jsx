import React, { useState, useEffect, useRef } from 'react';
import Messages from './Messages';
import Input from './Input';
import userimg from '../img/user.png';
import axios from 'axios'; 
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

const Chat = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  
  async function fetchData() {
    try {
      if (!currentUser || !currentChat) {
        return;
      }

      const response = await fetch(getAllMessagesRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: currentUser._id,
          to: currentChat._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

  useEffect(() => {
    if (currentChat) {
      fetchData();
    }
  }, [currentChat, currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        console.log({msg});
        setArrivalMessage({ fromSelf: false, message: msg });
      });
      
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

 
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    scrollToBottom();
  }, [messages]);
  
  const handleSendMsg = async (msg) => {
    try {
      if (!currentUser || !currentChat) {
        return;
      }

      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      socket.current.emit('send-msg', {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  return (
    currentChat && (
      <div className="chat">
        
        <div className="chatInfo">
          <div className="displaypic">
            <img
              src={userimg}
              alt=""
              style={{ maxWidth: '50px', maxHeight: '50px' }}
            ></img>
          </div>
          <span>{currentChat.username}</span>
        </div>

        <div className="chatSpace">
          <Messages messages={messages} />
        </div>
        <Input handleSendMsg={handleSendMsg} />
      </div>
    )
  );
};

export default Chat;