import React from "react";

interface MessageAreaProps {
  selectedChannel: string;
}

const MessageArea: React.FC<MessageAreaProps> = ({ selectedChannel }) => {
  return (
    <div className="flex-1 bg-[#2f3136] p-4 overflow-auto">
      <div className="text-white">
        <h2 className="text-2xl mb-4">#{selectedChannel}</h2>
        <div className="mb-4">
          <p>Welcome to Discord! Start chatting here.</p>
        </div>
        <div className="mb-4">
          <div>
            <strong>User1:</strong> Hello!
          </div>
          <div>
            <strong>User2:</strong> Hi there!
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Send a message"
            className="w-full p-2 bg-[#444] text-white rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
