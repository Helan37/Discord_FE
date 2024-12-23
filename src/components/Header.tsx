import React, { useState } from "react";
import { FaUserFriends, FaBell, FaInbox, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUsername("");
  };

  const handleSend = () => {
    console.log("Sending friend request to", username);
    handleModalClose();
  };

  return (
    <div>
      <div className="w-full text-white p-2 flex items-center justify-between border-b border-gray-600">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserFriends size={24} />
          <span className="font-bold text-white">Friends</span>
        </div>

        <div className="flex items-center space-x-4 flex-grow justify-center">
          <Link to="/wumpus">
            <button className="text-white hover:border-b-2 hover:border-white p-2">
              Online
            </button>
          </Link>
          <Link to="/wumpus">
            <button className="text-white hover:border-b-2 hover:border-white p-2">
              Pending
            </button>
          </Link>
          <Link to="/wumpus">
            <button className="text-white hover:border-b-2 hover:border-white p-2">
              Blocked
            </button>
          </Link>
          <button
            className="bg-green-500 text-white p-0.5 rounded hover:border-b-2 hover:border-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add Friend
          </button>
        </div>

        <div className="flex space-x-4 items-center cursor-pointer">
          <div className="relative group">
            <FaBell size={24} />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs p-1 rounded hidden group-hover:block">
              Group DM
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <FaInbox size={24} />
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs p-1 rounded hidden group-hover:block">
              Inbox
            </div>
          </div>

          <div className="relative group">
            <a href="https://support.discord.com/hc/en-us" target="_blank" rel="noopener noreferrer">
              <FaQuestionCircle size={24} className="text-green-600" />
            </a>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs p-1 rounded hidden group-hover:block">
              Help
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold text-white mb-4">Add Friend</h2>
            <input
              type="text"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="You can invite friends using their Discord username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-600 text-white p-2 rounded hover:bg-gray-500"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
