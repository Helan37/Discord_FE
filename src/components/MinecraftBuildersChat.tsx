import React, { useState } from "react";

const avatars = [
  "/images/avatars/8.jpg",
  "/images/avatars/11.jpg",
  "/images/avatars/12.jpg",
  "/images/avatars/13.jpg",
  "/images/avatars/14.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function MinecraftBuildersChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "BlockMaster", avatar: avatars[0], text: "I just finished building a massive castle—it took 10 hours!" },
    { id: 2, user: "RedstonePro", avatar: avatars[1], text: "Check out my new automatic farm design. It’s super efficient!" },
    { id: 3, user: "PixelCrafter", avatar: avatars[2], text: "Pixel art in Minecraft is so relaxing to create." },
    { id: 4, user: "TreeArchitect", avatar: avatars[3], text: "I’ve been working on a giant treehouse—it’s like something out of a fantasy novel!" },
    { id: 5, user: "MinecartEngineer", avatar: avatars[4], text: "I designed a rollercoaster using minecarts. It’s a blast!" },
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
      <h1 className="text-2xl font-bold mb-4">Minecraft Builders Gaming Channel</h1>

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
          placeholder="Share your Minecraft builds or tips..."
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

export default MinecraftBuildersChat;
