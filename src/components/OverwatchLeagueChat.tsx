import React, { useState } from "react";

const avatars = [
  "/images/avatars/24.jpg",
  "/images/avatars/25.jpg",
  "/images/avatars/2.jpg",
  "/images/avatars/13.jpg",
  "/images/avatars/8.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function OverwatchLeagueChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "TracerMain", avatar: avatars[0], text: "Did you see that insane Pulse Bomb play last night?" },
    { id: 2, user: "HanzoHero", avatar: avatars[1], text: "Dragonstrike combos are just so satisfying to watch!" },
    { id: 3, user: "LucioLover", avatar: avatars[2], text: "The way Lucio booped the entire enemy team off the map was epic!" },
    { id: 4, user: "DVaFan", avatar: avatars[3], text: "D.Va's Self-Destruct won the match in overtime—such a clutch play!" },
    { id: 5, user: "SigmaTheory", avatar: avatars[4], text: "Sigma’s ult synergy with Graviton Surge is just unbeatable." },
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
      <h1 className="text-2xl font-bold mb-4">Overwatch League Chat</h1>

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
          placeholder="Share your thoughts on Overwatch League..."
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

export default OverwatchLeagueChat;
