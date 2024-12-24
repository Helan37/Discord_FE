import React, { useState } from "react";

const avatars = [
  "/images/avatars/16.jpg",
  "/images/avatars/17.jpg",
  "/images/avatars/18.jpg",
  "/images/avatars/19.jpg",
  "/images/avatars/20.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function FortniteCrewChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "VictoryRoyale", avatar: avatars[0], text: "Just got my first Victory Royale in Chapter 5!" },
    { id: 2, user: "BattleBusPro", avatar: avatars[1], text: "Can’t wait for the new Battle Pass skins this season!" },
    { id: 3, user: "LlamaHunter", avatar: avatars[2], text: "I found three Loot Llamas in one match—talk about luck!" },
    { id: 4, user: "StormChaser", avatar: avatars[3], text: "Is anyone else constantly outrunning the storm in the late game?" },
    { id: 5, user: "SniperKing", avatar: avatars[4], text: "I hit a 360 no-scope headshot from across the map. It was insane!" },
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
      <h1 className="text-2xl font-bold mb-4">Fortnite Crew Game Chat</h1>

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
          placeholder="Share your Fortnite strategies or epic moments..."
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

export default FortniteCrewChat;
