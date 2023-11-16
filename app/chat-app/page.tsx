'use client';
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

const ChattyAppy = () => {
  // menu toggler
  const [toggle, setToggle] = useState(false);

  // manage current messages
  const [currentMessage, setCurrentMessage] = useState('');

  // create a socket.io server connection to specific port the server is running on
  const socket = io("http://localhost:3003");
  
  useEffect(() => {
    const chatArea = document.getElementById('chat-area');

    const createNewTextBubble = (value:string) => {
      const messageBubble = document.createElement('div');
      messageBubble.style.marginTop = '15px';
      messageBubble.style.padding = '12px'
      messageBubble.style.color = '#923824'
      messageBubble.style.borderColor = 'black';
      messageBubble.style.borderWidth = '1px';
      messageBubble.style.borderRadius = '9999px';
      messageBubble.style.width = 'fit-content'
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
    <main className="relative w-full min-h-screen mx-auto bg-gradient-to-r from-[#fffafa] from-10% via-[#fefefa] to-[#fffafa]">
      
      <header className='sticky top-0 left-0 bg-transparent shadow-md rounded-b-2xl flex justify-between items-center mb-6 pt-[15px] px-[5%] z-50'>
        <div className="basis-1/2 flex gap-x-2 text-[30px]">
          <span className="text-black">Chatty</span>
          <PiWechatLogoDuotone className="text-orange-700" />
          <span className="text-orange-800">Appy</span>
        </div>
        {/* your chattin with box */}
        <div className="absolute top-[35px] left-[29%] bg-orange-800 rounded-full py-[8px] px-4 flex gap-4 items-center">
          <p className="text-orange-200 text-[16px] italic">Your chattin&apos; with:</p>
          <GiPlagueDoctorProfile className="text-[#fffafa] text-[35px] animate-pulse" />
          <span className="text-orange-200 text-[14px]">Dr_bigBeak_04</span>
          <ActiveStatus />
        </div>
        {/* profile user */}
        <div className="flex gap-4 items-center">
          <GiRamProfile className="text-black text-[35px]" />
          <span className="text-black text-[14px] underline underline-offset-2">Miss.Goaty.Girl!2010</span>
          <ActiveStatus />
        </div>
        {/* menu toggle */}
        <button 
          onClick={() => setToggle((click) => !click)}
          className={`w-fit h-fit bg-transparent ${toggle ? 'rotate-90' : ''}`}
        >
          <HiDotsVertical size={30} color="black" />
        </button>
      </header>


      {/* menu side panel */}
      <div className={`${toggle ? 'right-0' : '-right-[100%]'} transition-all ease-in duration-[600ms] bg-orange-800 opacity-85 h-[75%] w-[400px] absolute top-[60px] bottom-0 rounded-tl-[50px] rounded-bl-[50px] z-40 p-9 flex flex-col justify-between z-45`}>
        <div className="flex flex-col gap-y-10">
          {/* your people */}
          <div>
            <p className="texzt-white text-[25px]">Your Peeps...</p>
            <div className="bg-orange-900 p-5 h-[125px] w-[100%] overflow-y-scroll flex flex-col gap-y-2 rounded-xl">
              <ChattContactBubble icon={<FaTheRedYeti />} name='immaYetiBB' status={false} />
              <ChattContactBubble icon={<GiBoar />} name='aGirlOnPoink!' status={true} />
              <ChattContactBubble icon={<GiEgyptianProfile />} name='_daQUEENCleo_84' status={false} />
              <ChattContactBubble icon={<GiPlagueDoctorProfile />} name='Dr_bigBeak_04' status={true} />
            </div>
          </div>

          {/* active chatts */}
          <div>
            <p className="texzt-white text-[25px]">Active Chatts...</p>
            <div className="flex flex-col gap-4">
              <RecentChattBubble icon={<FaTheRedYeti />} name='immaYetiBB' recentMessage="Wanna get some snowcones? I was thinking that" />
              <RecentChattBubble icon={<GiEgyptianProfile />} name='_daQUEENCleo_84' recentMessage="yurrrr, what up B?" />
              {/* create a new chatt */}
              <button className="bg-white rounded-full py-2 px-4 text-orange-900 hover:bg-orange-950 hover:text-white">+ Create a new chatt</button>
            </div>
          </div>
        </div>

        {/* log off button */}
        <div className="flex gap-2 items-center">
          <button className="bg-transparent hover:bg-white rounded-full w-fit text-[20px] py-2 px-4 text-white hover:text-orange-900 group">Log off</button>
          <div className="w-fit">
            <div className="text-white pl-[5px] text-[11px]">we will miss you...</div>
            <span className="bg-white h-[12px] rounded-full w-full transition-all duration-700"></span>
          </div>
        </div>
      </div>
        
      <div className="relative w-full px-[20px] md:px-[80px] lg:px-[100px] z-5">
        {/* display stored message */}
        <div id='chat-area' className="w-[50%] max-h-[100%] overflow-y-scroll"></div>

        <form onSubmit={(e) => sendMessage(e)} className='w-full fixed left-0 right-0 translate-x-[15%] bottom-[30px] flex'>
          {/* send a new message */}
          <input 
            type="text"
            value={currentMessage} 
            onChange={(e) => setCurrentMessage(e.target.value)}  
            placeholder="What's happenin'..." 
            className='w-[60%] text-black border-[2px] border-orange-900 h-[45px] pl-[15px] rounded-full focus:ring-purple-700 active:border-purple-700'
          />

          {/* button to send message */}
          <button className='rounded-full py-[8px] px-[50px] ml-[20px] text-orange-900 text-center bg-transparen border-[2px] border-orange-900 hover:bg-orange-900 hover:text-white'>Send</button>
        </form>
      </div>
    </main>
  )
}

export default ChattyAppy;