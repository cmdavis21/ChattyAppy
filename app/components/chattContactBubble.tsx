import React from 'react'
import Image from 'next/image';
import { ActiveStatus, OfflineStatus } from './statusBadge';

interface ContactBubbleProps {
    icon?: any;
    image?: string;
    name: string;
    status: boolean;
}

const ChattContactBubble: React.FC<ContactBubbleProps> = ({icon, image, name, status}) => {
  return (
    <div className="bg-orange-300 flex gap-3 rounded-xl items-center pl-5 py-[6px]">
        {icon ? (
            <div className='text-gray-800 text-[35px]'>{icon}</div>
        ) : (
            <Image 
                src={image!} 
                alt={`${name}'s profile pic`} 
                width={0} 
                height={0} 
            />
        )}
      <div className="flex flex-col text-left">
        <span className='text-gray-800 text-[16px]'>{name}</span>
        {!status ? (
            <OfflineStatus />
        ) : (
            <ActiveStatus />
        )}
      </div>
    </div>
  )
}

export default ChattContactBubble;