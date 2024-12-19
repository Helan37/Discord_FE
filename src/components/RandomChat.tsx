import React, { useState } from "react";


const avatars = [
  "/images/avatars/2.jpg",
  "/images/avatars/5.jpg",
  "/images/avatars/7.jpg",
  "/images/avatars/6.jpg",
  "/images/avatars/0.jpg",
];

function RandomChat() {
 
  const [messages, setMessages] = useState([
    { id: 1, user: "RandomBot", avatar: avatars[0], text: "Did you know? Honey never spoils!" },
    { id: 2, user: "TriviaGuy", avatar: avatars[1], text: "A shrimp's heart is in its head." },
    { id: 3, user: "JokeMaster", avatar: avatars[2], text: "Why don’t skeletons fight? They don’t have the guts!" },
    { id: 4, user: "FunFactFan", avatar: avatars[3], text: "Bananas are berries, but strawberries aren’t!" },
    { id: 5, user: "MemeKing", avatar: avatars[4], text: "Just saw a meme. Still laughing. 😂" },
  ]);

  const [newMessage, setNewMessage] = useState("");


  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      const randomUsername = `User${Math.floor(Math.random() * 1000) + 1}`; // Random user
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          user: randomUsername,
          avatar: randomAvatar,
          text: newMessage,
        },
      ]);
      setNewMessage(""); 
    }
  };

  return (
    <div className="h-screen  text-white flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Random Chat</h1>


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
          placeholder="Type a random thought..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default RandomChat;
