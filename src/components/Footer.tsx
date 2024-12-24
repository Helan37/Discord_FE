import React, { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaCog } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

interface FooterProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer({ setIsAuthenticated }: FooterProps) {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  const navigate = useNavigate();

  const handleMicrophoneToggle = () => setIsMicrophoneOn(!isMicrophoneOn);
  const handleSettingsToggle = () => setIsSettingsOpen(!isSettingsOpen);
  const handleUserDetailsToggle = () => setIsUserDetailsOpen(!isUserDetailsOpen);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="w-80 pl-24 bg-[#1e1f22] fixed bottom-0 left-0 text-white p-4 flex items-center justify-between">
      <div className="flex items-center cursor-pointer" onClick={handleUserDetailsToggle}>
        <img src="/images/discord2.png" alt="Discord logo" className="w-6 h-6 mr-2 " />
        <span className="font-bold">Helan</span>
        <div className="w-2 h-2 bg-green-500 rounded-full ml-2" />
      </div>

      <div className="flex space-x-4">
        <div onClick={handleMicrophoneToggle} className="cursor-pointer">
          {isMicrophoneOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
        </div>

        <div 
          onClick={handleSettingsToggle} 
          className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:rotate-[360deg]"
        >
          <FaCog size={24} />
        </div>
      </div>

      {isUserDetailsOpen && (
        <div className="absolute bottom-16 left-2/3 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg w-72">
          <h2 className="font-bold">User Details</h2>
          <p>Name: Helan</p>
          <p>Username: @helen_123</p>
          <p>Status: Online</p>
          <p>Email: helan@example.com</p>
          <button
            onClick={handleUserDetailsToggle}
            className="mt-2 text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}

      {isSettingsOpen && (
        <div className="absolute bottom-16 left-2/3 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg w-72">
          <h2 className="font-bold">Settings</h2>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
            onClick={() => alert("Change password clicked")}
          >
            Change Password
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded mt-2 w-full"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            onClick={handleSettingsToggle}
            className="mt-2 text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Footer;
