import React from "react";

interface AddServerModalProps {
  newServerName: string;
  setNewServerName: React.Dispatch<React.SetStateAction<string>>;
  handleAddServer: () => void;
  closeModal: () => void;
}

const AddServerModal: React.FC<AddServerModalProps> = ({
  newServerName,
  setNewServerName,
  handleAddServer,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#313338] p-6 rounded-lg w-80">
        <h2 className="text-xl text-white font-semibold mb-4">Create New Server</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 rounded-md bg-[#1e1f22] text-white border border-gray-500"
          placeholder="Enter server name"
          value={newServerName}
          onChange={(e) => setNewServerName(e.target.value)}
        />
        <div className="flex justify-between mt-2">
          <button
            className="bg-gray-400 text-white py-2 px-4 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-discord text-white py-2 px-4 rounded"
            onClick={handleAddServer}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServerModal;
