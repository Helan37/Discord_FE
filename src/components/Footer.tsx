import React, { useState } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaCog } from "react-icons/fa";

interface FooterProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  userDetails: { username: string; email: string } | null;
}

function Footer({ setIsAuthenticated, handleLogout, userDetails }: FooterProps) {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);

  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<string | null>(null);

  const handleMicrophoneToggle = () => setIsMicrophoneOn(!isMicrophoneOn);
  const handleSettingsToggle = () => setIsSettingsOpen(!isSettingsOpen);
  const handleUserDetailsToggle = () => setIsUserDetailsOpen(!isUserDetailsOpen);

  const handleLogoutClick = () => {
    setIsLogoutConfirmationOpen(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmationOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setIsLogoutConfirmationOpen(false);
  };
  const handleChangePasswordClick = async () => {
    try {
      const response = await fetch("https://discord-backend-hkbq.onrender.com/api/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newpassword: newPassword }),
      });
      const data = await response.json();
  
      if (response.ok) {
        setPasswordChangeStatus("Password changed successfully!");
        setTimeout(() => {
          handleChangePasswordPopupClose();
        }, 2000);
      } else {
        setPasswordChangeStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setPasswordChangeStatus("An error occurred. Please try again.");
    }
  };
  

  const handleChangePasswordPopupClose = () => {
    setIsChangePasswordPopupOpen(false);
    setEmail("");
    setNewPassword("");
    setPasswordChangeStatus(null);
  };

  return (
    <div className="w-80 pl-24 bg-[#1e1f22] fixed bottom-0 left-0 text-white p-4 flex items-center justify-between">
      <div className="flex items-center cursor-pointer" onClick={handleUserDetailsToggle}>
        <img src="/images/discord2.png" alt="Discord logo" className="w-6 h-6 mr-2" />
        <span className="font-bold">{userDetails?.username || "Guest"}</span>
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
          <p>Username: {userDetails?.username || "Guest"}</p>
          <p>Email: {userDetails?.email || "N/A"}</p>
          <p>Status: Online</p>
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
            onClick={() => setIsChangePasswordPopupOpen(true)}
          >
            Change Password
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded mt-2 w-full"
            onClick={handleLogoutClick}
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

      {isLogoutConfirmationOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="absolute bottom-28 left-2/3 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg w-72">
            <h2 className="font-bold text-xl text-center">Are you sure you want to log out?</h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isChangePasswordPopupOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="absolute bottom-28 left-2/3 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg w-72">
            <h2 className="font-bold text-xl text-center">Change Password</h2>
            <input
              type="email"
              className="bg-gray-800 text-white p-2 rounded w-full mt-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="bg-gray-800 text-white p-2 rounded w-full mt-4"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="mt-4">
              <button
                onClick={handleChangePasswordClick}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>
              {passwordChangeStatus && (
                <p className="mt-2 text-center text-red-500">{passwordChangeStatus}</p>
              )}
            </div>
            <button
              onClick={handleChangePasswordPopupClose}
              className="mt-2 text-red-500 hover:underline w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
