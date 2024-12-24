import React, { useState } from "react";

const avatars = [
  "/images/avatars/10.jpg",
  "/images/avatars/11.jpg",
  "/images/avatars/22.jpg",
  "/images/avatars/23.jpg",
  "/images/avatars/25.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function IndieMusicLoversChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "VinylVibes", avatar: avatars[0], text: "Just discovered this new indie band, their album is amazing!" },
    { id: 2, user: "BeatBender", avatar: avatars[1], text: "I’ve been obsessed with lo-fi indie music lately. So chill!" },
    { id: 3, user: "AcousticSoul", avatar: avatars[2], text: "The acoustic versions of songs hit different. Anyone else feel that?" },
    { id: 4, user: "IndieExplorer", avatar: avatars[3], text: "Have you heard the latest album from The Paper Kites? Pure gold." },
    { id: 5, user: "Songbird", avatar: avatars[4], text: "Seeing my favorite indie band live in concert next week. Can’t wait!" },
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
      <h1 className="text-2xl font-bold mb-4">Indie Music Lovers Chat</h1>

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
          placeholder="Share your favorite indie tracks or upcoming concerts..."
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

export default IndieMusicLoversChat;
