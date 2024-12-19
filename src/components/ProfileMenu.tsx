import { useState } from "react";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-white bg-gray-600 p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        Profile
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md">
          <ul>
            <li className="p-2 hover:bg-gray-200 cursor-pointer">
              View Profile
            </li>
            <li className="p-2 hover:bg-gray-200 cursor-pointer text-red-400">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
