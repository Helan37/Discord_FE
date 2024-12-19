import React, { useState } from "react";
import { Discord, Download, Discover } from "./svg";
import DownloadModal from "./DownloadModal";
import DiscoverModal from "./DiscoverModal"; 
import { Link } from "react-router-dom";

interface Server {
  id: number;
  name: string;
}

interface SidebarProps {
  setActiveServerId: (id: number | null) => void;
  activeServerId: number | null;
  openModal: () => void;
  servers: Server[];
  handleAddServer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setActiveServerId,
  activeServerId,
  openModal,
  servers,
  handleAddServer,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for DownloadModal
  const [isDiscoverModalOpen, setIsDiscoverModalOpen] = useState(false); // Add state for DiscoverModal

  const openDiscoverModal = () => {
    setIsDiscoverModalOpen(true);
  };

  const closeDiscoverModal = () => {
    setIsDiscoverModalOpen(false);
  };

  const openDownloadModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen w-20 bg-[rgb(30,31,34)] flex flex-col items-center py-4 space-y-4 p-9">
      <Link to="/">
      <div
        className={`w-12 h-12 p-2 text-white rounded-full flex justify-center items-center cursor-pointer transition-all duration-100 ease-in-out ${
          activeServerId === null
            ? "bg-discord rounded-2xl"
            : "bg-gray-600 hover:bg-discord hover:rounded-2xl"
        }`}
        onClick={() => setActiveServerId(null)}
      >
        <Discord />
      </div>
      </Link>
      {servers.map((server) => (
        <Link key={server.id} to={`/server/${server.id}`}>
          <div
            onClick={() => setActiveServerId(server.id)}
            className={`h-12 w-12 rounded-full flex justify-center items-center cursor-pointer transition-all duration-100 ease-in-out ${
              activeServerId === server.id
                ? "bg-discord rounded-2xl"
                : "bg-gray-600 hover:bg-discord hover:rounded-2xl"
            }`}
          >
            <span className="text-white text-sm">{server.name.charAt(0)}</span>
          </div>
        </Link>
      ))}
      <div className="relative group">
        <button
          onClick={handleAddServer}
          className="h-12 w-12 pb-1 rounded-full text-[#4CAF50] text-4xl bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-[#4CAF50] hover:text-white hover:rounded-2xl transition-all duration-100 ease-in-out"
        >
          +
        </button>
        <span className="absolute left-16 bottom-0 hidden group-hover:inline-block text-white bg-black p-2 rounded-md text-xs">
          Add a Server
        </span>
      </div>
      <div className="relative group">
        <button
          onClick={openDownloadModal} 
          className="h-12 w-12 pb-1 rounded-full text-[#4CAF50] text-4xl bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-[#4CAF50] hover:text-white hover:rounded-2xl transition-all duration-100 ease-in-out"
        >
          <Download />
        </button>
        <span className="absolute left-16 bottom-0 hidden group-hover:inline-block text-white bg-black p-2 rounded-md text-xs">
          Download App
        </span>
      </div>
      <div className="relative group">
        <button
          onClick={openDiscoverModal}
          className="h-12 w-12 pb-1 rounded-full text-[#ffffff] text-4xl bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-[#4CAF50] hover:text-white hover:rounded-2xl transition-all duration-100 ease-in-out"
        >
          <Discover />
        </button>
        <span className="absolute left-16 bottom-0 hidden group-hover:inline-block text-white bg-black p-2 rounded-md text-xs">
          Discover
        </span>
      </div>
      <DownloadModal closeModal={closeModal} isOpen={isModalOpen} />
      <DiscoverModal isOpen={isDiscoverModalOpen} closeModal={closeDiscoverModal} /> {/* Pass closeDiscoverModal here */}
    </div>
  );
};

export default Sidebar;
