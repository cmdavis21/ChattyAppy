import React, { useState } from 'react'
import { FaTheRedYeti } from 'react-icons/fa6'
import { GiRamProfile, GiBoar, GiEgyptianProfile, GiPlagueDoctorProfile } from 'react-icons/gi'
import ChattContactBubble from './chattContactBubble'
import RecentChattBubble from './recentChattBubble'
import { ActiveStatus } from './statusBadge'
import { ImTux } from 'react-icons/im'
import { LuGhost } from 'react-icons/lu'
import SwitchProfileBubble from './switchProfileBubble'

const AppMenu = () => {
// menu toggler
const [toggle, setToggle] = useState(false);

  return (
    <div className={`${toggle ? 'bottom-0 md:right-0' : 'bottom-[100%] md:-right-[800px]'} transition-all ease-in duration-[600ms] bg-orange-800 opacity-85 h-full w-full md:w-[450px] absolute top-[68px]  rounded-tl-[50px] rounded-bl-[50px] z-40 p-4 md:p-9 flex flex-col justify-between z-45`}>
        <div className="flex flex-col gap-y-10">
          {/* profile user */}
            <p className="text-white text-[25px]">You...</p>
            <div className="flex gap-4 items-center min-w-[240px] max-w-[280px]">
              <GiRamProfile className="text-black text-[35px]" />
              <span 
                
                className='text-black text-[14px] hover:underline hover:underline-offset-1 break-words'
              >
                Miss.Goaty.Girl!2010
              </span>
              <ActiveStatus />
            </div>

            {/* switch profiles */}
            </div>
                <div className={`transition-all ease-in duration-[600ms] z-40 bg-orange-800 w-[220px] p-4 rounded-3xl flex-col gap-y-2`}>
                <p className="text-white text-[25px] ">Switch Accounts...</p>
                <SwitchProfileBubble icon={<ImTux />} name='Mr_Flipper09' />
                <SwitchProfileBubble icon={<LuGhost />} name='xxSheAGhostGurlXx' />
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
              <ChattContactBubble icon={<FaTheRedYeti />} name='immaYetiBB' status={false} />
              <ChattContactBubble icon={<GiBoar />} name='aGirlOnPoink!' status={true} />
              <ChattContactBubble icon={<GiEgyptianProfile />} name='_daQUEENCleo_84' status={false} />
              <ChattContactBubble icon={<GiPlagueDoctorProfile />} name='Dr_bigBeak_004' status={true} />
            </div>
          </div>

          {/* active chatts */}
          <div>
            <p className="text-white text-[25px]">Active Chatts...</p>
            <div className="flex flex-col gap-4">
              <RecentChattBubble icon={<FaTheRedYeti />} name='immaYetiBB' recentMessage="Wanna get some snowcones? I was thinking that" />
              <RecentChattBubble icon={<GiEgyptianProfile />} name='_daQUEENCleo_84' recentMessage="yurrrr, what up B?" />
              {/* create a new chatt */}
              <button className="bg-white rounded-full py-2 px-4 text-orange-900 hover:bg-orange-950 hover:text-white">+ Create a new chatt</button>
            </div>
          </div>
      </div>
  )
}

export default AppMenu