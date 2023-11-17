import React, { useState } from 'react'
import { GiBoar, GiEgyptianProfile, GiPlagueDoctorProfile, GiRamProfile } from 'react-icons/gi'
import { HiDotsVertical } from 'react-icons/hi'
import { ImTux } from 'react-icons/im'
import { LuGhost } from 'react-icons/lu'
import { PiWechatLogoDuotone } from 'react-icons/pi'
import { ActiveStatus } from './statusBadge'
import { FaTheRedYeti } from 'react-icons/fa6'
import { ActiveChatProfileCard, ProfileContactCard, SwitchProfileCard } from './chattProfileCards'

const AppHeaderAndMenu = () => {

  // menu toggler
  const [toggle, setToggle] = useState(false);
  
  return (
    <>
      {/* HEADER AND MENU PANEL */}
      <header className='sticky h-fit top-0 left-0 bg-transparent shadow-md rounded-b-2xl flex justify-between items-center mb-6 pt-[15px] px-[10px] lg:px-[5%] z-50'>
        {/* site logo */}
        <div className='hidden lg:flex lg:basis-1/2 gap-x-2 text-[30px]'>
          <span className="text-black">Chatty</span>
          <PiWechatLogoDuotone className="text-orange-700" />
          <span className="text-orange-800">Appy</span>
        </div>

        {/* your chattin with box */}
        <div className="flex lg:absolute md:top-[40px] left-[35%] lg:top-[35px] lg:left-[29%] lg:bg-orange-800 rounded-full py-[8px] px-4 gap-4 items-center">
          <p className="hidden lg:block text-orange-200 text-[16px] italic">Your chattin&apos; with:</p>
          <GiPlagueDoctorProfile className="text-gray-800 lg:text-[#fffafa] text-[35px]" />
          <span className="text-gray-800 lg:text-orange-200 text-[16px]">Dr_bigBeak_004</span>
          <ActiveStatus />
        </div>

        {/* profile user */}
        <div className="hidden lg:flex gap-4 items-center min-w-[240px] max-w-[280px]">
          <GiRamProfile className="text-black text-[35px]" />
          <span

            className='text-black text-[14px] hover:underline hover:underline-offset-1 break-words cursor-pointer'
          >
            Miss.Goaty.Girl!2010
          </span>
          <ActiveStatus />
        </div>

        {/* menu toggle button */}
        <button
          onClick={() => setToggle((click) => !click)}
          className={`w-fit h-fit bg-transparent ${toggle ? 'rotate-90' : ''}`}
        >
          <HiDotsVertical size={30} color="black" />
        </button>
      </header>
      
      <nav className={`${toggle ? 'right-0' : '-right-[800px]'} transition-all ease-in duration-[600ms] bg-orange-800 opacity-85 overflow-y-scroll w-full md:w-[450px] absolute top-[68px] md:rounded-tl-[50px] md:rounded-bl-[50px] p-4 md:p-9 flex flex-col justify-between z-45`}>
        <div className="flex flex-col gap-y-8">
          {/* profile user */}
          <div>
            <p className="text-white text-[25px]">You...</p>
            <div className="flex gap-4 items-center min-w-[240px] max-w-[280px]">
              <GiRamProfile className="text-orange-200 text-[40px]" />
              <span className='text-orange-200 text-[20px] hover:underline hover:underline-offset-1 break-words'>Miss.Goaty.Girl!2010</span>
            </div>
          </div>

          {/* switch profiles */}
          <div className='flex-col gap-y-2'>
            <p className="text-white text-[25px]">Switch Accounts...</p>
            <SwitchProfileCard icon={<ImTux />} name='Mr_Flipper09'/>
            <SwitchProfileCard icon={<LuGhost />} name='xxSheAGhostGurlXx'/>
          </div>

          {/* log off button */}
          <div className="grid grid-cols-2 grid-rows-2 w-[75%]">
            <button className="row-span-2 bg-transparent hover:bg-white rounded-full w-fit text-[20px] py-2 px-4 text-white hover:text-orange-900 peer">Log off</button>
            <div className="text-white pl-[5px] text-[11px] flex items-end">we will miss you...</div>
            <span className="bg-white h-[1px] rounded-full flex items-end w-0 peer-hover:w-full transition-all duration-700"></span>
          </div>

          {/* your people */}
          <div>
            <p className="text-white text-[25px]">Your Peeps...</p>
            <div className="bg-orange-900 p-5 h-[125px] w-[100%] overflow-y-scroll flex flex-col gap-y-2 rounded-xl">
              <ProfileContactCard icon={<FaTheRedYeti />} name='immaYetiBB' status={false}/>
              <ProfileContactCard icon={<GiBoar />} name='aGirlOnPoink!' status={true}/>
              <ProfileContactCard icon={<GiEgyptianProfile />} name='_daQUEENCleo_84' status={false}/>
              <ProfileContactCard icon={<GiPlagueDoctorProfile />} name='Dr_bigBeak_004' status={true}/>
            </div>
          </div>

          {/* active chatts */}
          <div>
            <p className="text-white text-[25px]">Active Chatts...</p>
            <div className="flex flex-col gap-4">
              <ActiveChatProfileCard icon={<FaTheRedYeti />} name='immaYetiBB' recentMessage="Wanna get some snowcones? I was thinking that"/>
              <ActiveChatProfileCard icon={<GiEgyptianProfile />} name='_daQUEENCleo_84' recentMessage="yurrrr, what up B?"/>
              {/* create a new chatt */}
              <button className="bg-white rounded-full py-2 px-4 text-orange-900 hover:bg-orange-950 hover:text-white">+ Create a new chatt</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default AppHeaderAndMenu