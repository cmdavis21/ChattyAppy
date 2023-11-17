import React from 'react';
import Image from 'next/image';
import { ActiveStatus, OfflineStatus } from './statusBadge';

interface ProfileCardProps {
    icon?: any;
    image?: string;
    name: string;
    status?: boolean;
    recentMessage?: string;
}

export const SwitchProfileCard: React.FC<ProfileCardProps> = ({icon, image, name}) => {
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
    );
}

export const ProfileContactCard: React.FC<ProfileCardProps> = ({icon, image, name, status}) => {
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
    );
}

export const ActiveChatProfileCard: React.FC<ProfileCardProps> = ({icon, image, name, recentMessage}) => {
    return (
        <div className="bg-orange-300 text-orange-900 flex gap-3 rounded-xl items-center px-5 py-[6px]">
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
        <div className="flex flex-col text-left overflow-x-hidden w-[90%]">
          <span className='text-gray-800 text-[16px]'>{name}</span>
          <span className="whitespace-nowrap text-[14px]">{recentMessage}</span>
        </div>
      </div>
    );
}