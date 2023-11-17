'use client';
import { FiSend } from "react-icons/fi";
import { LuGhost } from "react-icons/lu";
import { ImTux } from "react-icons/im";
import { GiBoar } from "react-icons/gi";
import { FaTheRedYeti } from "react-icons/fa6";
import { GiEgyptianProfile } from "react-icons/gi";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { GiRamProfile } from "react-icons/gi";
import { PiWechatLogoDuotone } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import React, { useState, useEffect, FormEvent } from 'react'
import { io } from 'socket.io-client';
import { ActiveStatus, OfflineStatus } from "../components/statusBadge";
import RecentChattBubble from "../components/recentChattBubble";
import ChattContactBubble from "../components/chattContactBubble";
import SwitchProfileBubble from "../components/switchProfileBubble";
import AppHeader from "../components/header";
import AppMenu from "../components/menuPanel";

const ChattyAppy = () => {
  // menu toggler
  const [toggle, setToggle] = useState(false);
  // profile switch toggler
  const [dropdown, setDropdown] = useState(false);

  // manage current messages
  const [currentMessage, setCurrentMessage] = useState('');

  // create a socket.io server connection to specific port the server is running on
  const socket = io("http://localhost:3003");
  
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
    <main className="min-w-screen min-h-screen overflow-x-hidden mx-auto bg-gradient-to-r from-[#fffafa] from-10% via-[#fefefa] to-[#fffafa]">
      
      <AppHeader />      

      <AppMenu />
      
      
      {/* input area */}
      <div className="relative w-full px-[10px] md:px-[80px] lg:px-[100px] z-5">
        
        {/* display stored message */}
        <div id='chat-area' className="w-[50%] max-h-[100%] overflow-y-scroll"></div>

        {/* input form and button */}
        <form onSubmit={(e) => sendMessage(e)} className='w-full fixed left-0 right-0 translate-x-[12%] md:translate-x-[15%] lg:translate-x-[18%] bottom-[30px] flex'>
          {/* send a new message */}
          <input 
            type="text"
            value={currentMessage} 
            onChange={(e) => setCurrentMessage(e.target.value)}  
            placeholder="What's happenin'..." 
            className='w-[60%] text-black border-[2px] border-orange-900 h-[45px] pl-[15px] rounded-full focus:ring-purple-700 active:border-purple-700'
          />

          {/* button to send message */}
          <button className='rounded-full py-[4px] px-[12px] ml-[8px] md:ml-[20px] text-orange-900 text-center bg-transparen border-[2px] border-orange-900 hover:bg-orange-900 hover:text-white'><FiSend size={22}/></button>
        </form>
      </div>
    </main>
  )
}

export default ChattyAppy;