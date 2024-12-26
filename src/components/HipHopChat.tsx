import React, { useState } from "react";

const avatars = [
  "/images/avatars/0.jpg",
  "/images/avatars/20.jpg",
  "/images/avatars/21.jpg",
  "/images/avatars/23.jpg",
  "/images/avatars/24.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function HipHopChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "RapMaster", avatar: avatars[0], text: "Just dropped a new freestyle! Check it out, fam!" },
    { id: 2, user: "BeatKing", avatar: avatars[1], text: "The new album from Kendrick Lamar is fire! Best album this year." },
    { id: 3, user: "FlowGoddess", avatar: avatars[2], text: "Loving the old school beats in modern rap. That golden era vibe!" },
    { id: 4, user: "Lyricist", avatar: avatars[3], text: "Got some new bars I’m working on. Who’s down for a cipher?" },
    { id: 5, user: "TurnTableKing", avatar: avatars[4], text: "Spinning some classic hip-hop tracks tonight. Let’s vibe!" },
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
      <h1 className="text-2xl font-bold mb-4">Hip Hop Chat</h1>

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
          placeholder="Share your favorite bars, albums, or hip hop news..."
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

export default HipHopChat;
