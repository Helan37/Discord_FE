import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const ChannelPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const channelName = location.state?.channelName || `Channel ${channelId}`;

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const userProfile = "/images/avatars/9.jpg";

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#313338]">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-2xl font-bold text-white">Channel: {channelName}</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg"
              >
                <img
                  src={userProfile}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex flex-col">
                  <span className="text-sm text-gray-300 font-semibold">
                    {message.sender}
                  </span>
                  <p className="text-white mt-1">{message.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No messages yet</div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-600">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-lg border border-gray-600 text-white bg-gray-800 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
