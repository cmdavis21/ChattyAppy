import React, { useState } from 'react'
import { GiPlagueDoctorProfile, GiRamProfile } from 'react-icons/gi'
import { HiDotsVertical } from 'react-icons/hi'
import { ImTux } from 'react-icons/im'
import { LuGhost } from 'react-icons/lu'
import { PiWechatLogoDuotone } from 'react-icons/pi'
import { ActiveStatus } from './statusBadge'
import SwitchProfileBubble from './switchProfileBubble'

const AppHeader = () => {

    // menu toggler
    const [toggle, setToggle] = useState(false);
  
  return (
        <header className='sticky h-fit top-0 left-0 bg-transparent shadow-md rounded-b-2xl flex justify-between items-center mb-6 pt-[15px] px-[10px] lg:px-[5%] z-50'>
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
          {/* menu toggle */}
          <button 
            onClick={() => setToggle((click) => !click)}
            className={`w-fit h-fit bg-transparent ${toggle ? 'rotate-90' : ''}`}
          >
            <HiDotsVertical size={30} color="black" />
          </button>
        </header>
    )
}

export default AppHeader