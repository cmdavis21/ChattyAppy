'use client';
import { FiSend } from "react-icons/fi";
import React, { useState, useEffect, FormEvent } from 'react'
import { io } from 'socket.io-client';
import AppHeaderAndMenu from "../components/headerAndMenu";
import { MdOutlineGifBox } from "react-icons/md";

const ChattyAppy = () => {
  // manage current messages
  const [currentMessage, setCurrentMessage] = useState('');

  // create a socket.io server connection to specific port the server is running on
  const socket = io("http://localhost:3003");
  
  // fire this code before render, create a chatt bubble
  useEffect(() => {
    const chatArea = document.getElementById('chat-area');

    const createNewTextBubble = (value:string) => {
      const messageBubble = document.createElement('div');
      messageBubble.style.marginTop = '15px';
      messageBubble.style.padding = '12px';
      messageBubble.style.color = '#923824';
      messageBubble.style.borderColor = 'black';
      messageBubble.style.borderWidth = '1px';
      messageBubble.style.borderRadius = '9999px';
      messageBubble.style.width = 'fit-content';
      messageBubble.style.fontSize = '18px';
      messageBubble.innerHTML = `${value}`;
      chatArea?.append(messageBubble)
    } 

    socket.on("connect", () => {
      console.log(`Socket is connected`);
    })

    // listen from server sending messages
    socket.on("message", (message) => {
      createNewTextBubble(message)
    })

    socket.on("disconnect", () => {
      console.log(`Socket is disconnected.`)
    });
  }, [socket]);
  
  // client sending messages to the server
  const sendMessage: React.FormEventHandler<HTMLFormElement> = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // send to server
    socket.emit("message", currentMessage);
    console.log(`Sending message: "${currentMessage}"`);
   
    setCurrentMessage('');
  }

  return (
    <main className="relative min-w-screen min-h-screen overflow-x-hidden mx-auto bg-gradient-to-r from-[#fffafa] from-10% via-[#fefefa] to-[#fffafa]">
      
      <AppHeaderAndMenu />   
      
      {/* input area */}
      <div className="w-full px-[10px] md:px-[80px] lg:px-[100px] z-5">
        
        {/* display stored message */}
        <div id='chat-area' className="w-[50%] max-h-[100%] overflow-y-scroll"></div>

        {/* input form area */}
        <div className="w-full fixed  bottom-[30px] flex items-center">
          <MdOutlineGifBox 
            className="mr-[8px] md:mr-[20px] text-[40px] text-orange-900" 
          />

          <form onSubmit={(e) => sendMessage(e)}>
            {/* send a new message */}
            <input 
              type="text"
              value={currentMessage} 
              onChange={(e) => setCurrentMessage(e.target.value)}  
              placeholder="What's happenin'..." 
              className='w-[60%] text-black border-[2px] border-orange-900 h-[45px] pl-[15px] rounded-full focus:ring-gray-700 active:border-gray-700'
            />
            {/* button to send message */}
            <button className='rounded-full h-[45px] px-[15px] ml-[8px] md:ml-[20px] text-orange-900 text-center bg-transparent border-[2px] border-orange-900 hover:bg-orange-900 hover:text-white'><FiSend size={22}/></button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ChattyAppy;