import React, { useState } from "react";

const avatars = [
  "/images/avatars/20.jpg",
  "/images/avatars/11.jpg",
  "/images/avatars/22.jpg",
  "/images/avatars/13.jpg",
  "/images/avatars/24.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function TechCommunityChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", avatar: avatars[0], text: "AI is transforming industries rapidly!" },
    { id: 2, user: "Bob", avatar: avatars[1], text: "Have you tried using TypeScript? It's amazing for large projects." },
    { id: 3, user: "Charlie", avatar: avatars[2], text: "I just set up a Kubernetes cluster. The learning curve is steep, but it's worth it!" },
    { id: 4, user: "Diana", avatar: avatars[3], text: "React and Tailwind CSS are my go-to tools for frontend development." },
    { id: 5, user: "Eve", avatar: avatars[4], text: "Blockchain has so much potential beyond cryptocurrencies!" },
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
      <h1 className="text-2xl font-bold mb-4">Tech Community Chat</h1>

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
          placeholder="Share your tech insights..."
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

export default TechCommunityChat;
