import React, { useState } from "react";

const avatars = [
  "/images/avatars/8.jpg",
  "/images/avatars/9.jpg",
  "/images/avatars/10.jpg",
  "/images/avatars/11.jpg",
  "/images/avatars/12.jpg",
];

function TechTalkChat() {

  const [messages, setMessages] = useState([
    { id: 1, user: "DevGuru", avatar: avatars[0], text: "JavaScript is the backbone of modern web development!" },
    { id: 2, user: "TechieTony", avatar: avatars[1], text: "React's useState is so intuitive for managing component state." },
    { id: 3, user: "AI_Enthusiast", avatar: avatars[2], text: "Did you see the latest GPT release? Mind-blowing!" },
    { id: 4, user: "CodeWizard", avatar: avatars[3], text: "Have you tried Tailwind CSS? It’s a game changer for styling!" },
    { id: 5, user: "CloudChaser", avatar: avatars[4], text: "Serverless architecture is the future of scalable apps." },
  ]);


  const [newMessage, setNewMessage] = useState("");

  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      const randomUsername = `Techie${Math.floor(Math.random() * 1000) + 1}`; // Random techie username
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
    <div className="h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tech Talk Chat</h1>

     
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
          placeholder="Share your tech thoughts..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default TechTalkChat;