import React, { useState } from "react";

const avatars = [
  "/images/avatars/0.jpg",
  "/images/avatars/1.jpg",
  "/images/avatars/2.jpg",
  "/images/avatars/3.jpg",
  "/images/avatars/4.jpg",
];

const userAvatar = "/images/avatars/6.jpg";

function GeneralChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", avatar: avatars[0], text: "Hi! Welcome to the general channel!" },
    { id: 2, user: "Bob", avatar: avatars[1], text: "Discord is such a great platform!" },
    { id: 3, user: "Charlie", avatar: avatars[2], text: "I'm learning React and loving it!" },
    { id: 4, user: "Diana", avatar: avatars[3], text: "Building a Discord clone is fun!" },
    { id: 5, user: "Eve", avatar: avatars[4], text: "Collaborating with others is the best part!" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          user: "You",
          avatar: userAvatar,
          text: newMessage,
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen text-white flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">General Chat</h1>

      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-4">
            <img
              src={message.avatar}
              alt={message.user}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{message.user}</p>
              <p className="text-gray-300">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default GeneralChat;
