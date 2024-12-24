import React, { useState } from "react";

const avatars = [
  "/images/avatars/5.jpg",
  "/images/avatars/6.jpg",
  "/images/avatars/7.jpg",
  "/images/avatars/8.jpg",
  "/images/avatars/10.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function CreativeCodersChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alex", avatar: avatars[0], text: "I built an interactive art piece using p5.js!" },
    { id: 2, user: "Jordan", avatar: avatars[1], text: "WebGL is so powerful for creating 3D experiences on the web." },
    { id: 3, user: "Taylor", avatar: avatars[2], text: "Have you tried combining CSS animations with JavaScript? Endless possibilities!" },
    { id: 4, user: "Morgan", avatar: avatars[3], text: "I’m exploring generative art with Python and Processing. It’s so addictive!" },
    { id: 5, user: "Reese", avatar: avatars[4], text: "Made a music visualizer in JavaScript—it syncs perfectly with the beat!" },
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
      <h1 className="text-2xl font-bold mb-4">Creative Coders Chat</h1>

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
          placeholder="Share your creative coding ideas..."
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

export default CreativeCodersChat;
