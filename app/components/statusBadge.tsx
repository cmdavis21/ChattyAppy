import React from 'react';

export const ActiveStatus = () => {
  return (
    <div className="flex gap-2 items-center w-fit bg-green-400 rounded-full py-1 px-2 text-[10px] text-green-800">
        <div className="rounded-full w-2 h-2 bg-green-800 animate-bounce"></div>
        Active
    </div>
  );
};

export const OfflineStatus = () => {
  return (
    <div className="flex gap-2 items-center w-fit bg-gray-400 rounded-full py-1 px-2 text-[10px] text-gray-900">
        <div className="rounded-full w-2 h-2 bg-gray-900"></div>
        Offline
    </div>
  );
};