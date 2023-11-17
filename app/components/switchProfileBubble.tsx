import React from 'react'
import Image from 'next/image';

interface ProbileBubbleProps {
    icon?: any;
    image?: string;
    name: string;
}

const SwitchProfileBubble: React.FC<ProbileBubbleProps> = ({icon, image, name}) => {
  return (
    <div className="bg-orange-300 text-orange-900 flex gap-3 rounded-xl items-center px-5 py-[6px]">
      {icon ? (
          <div className='text-gray-800 text-[22px]'>{icon}</div>
      ) : (
          <Image 
              src={image!} 
              alt={`${name}'s profile pic`} 
              width={0} 
              height={0} 
          />
      )}
      <div className="flex flex-col text-left overflow-x-hidden w-[90%]">
        <span className='text-gray-800 text-[14px]'>{name}</span>
      </div>
    </div>
  )
}

export default SwitchProfileBubble