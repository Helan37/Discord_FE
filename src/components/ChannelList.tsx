import React from "react";
import { Link } from "react-router-dom";

function ChannelList() {
  return (
    <div className="h-screen w-60 flex flex-col items-start py-4 px-6 space-y-6">
      <h1 className="text-white text-2xl font-bold pb-2 border-b border-gray-600 pt-1">Channels</h1>
         <div className="space-y-4 w-full">
        <Link
          to="/general"
          className="block text-white text-lg font-medium px-4 py-2 rounded-md border border-transparent hover:border-gray-600 hover:bg-gray-700 hover:text-gray-100 transition-all duration-200 ease-in-out"
        >
          <div className="w-full flex items-center">
            <span className="w-full"># general</span>
          </div>
        </Link>
        <Link
          to="/random"
          className="block text-white text-lg font-medium px-4 py-2 rounded-md border border-transparent hover:border-gray-600 hover:bg-gray-700 hover:text-gray-100 transition-all duration-200 ease-in-out"
        >
          <div className="w-full flex items-center">
            <span className="w-full"># random</span>
          </div>
        </Link>
        <Link
          to="/tech-talk"
          className="block text-white text-lg font-medium px-4 py-2 rounded-md border border-transparent hover:border-gray-600 hover:bg-gray-700 hover:text-gray-100 transition-all duration-200 ease-in-out"
        >
          <div className="w-full flex items-center">
            <span className="w-full"># tech-talk</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ChannelList;
