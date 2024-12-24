import React, { useState } from "react";

const avatars = [
  "/images/avatars/11.jpg",
  "/images/avatars/12.jpg",
  "/images/avatars/13.jpg",
  "/images/avatars/14.jpg",
  "/images/avatars/15.jpg",
];

const userAvatar = "/images/avatars/9.jpg";

function ElectronicBeatsChat() {
  const [messages, setMessages] = useState([
    { id: 1, user: "BeatMaker", avatar: avatars[0], text: "Just dropped my new track! Anyone into progressive house?" },
    { id: 2, user: "SynthMaster", avatar: avatars[1], text: "I’m really into synthwave right now. The nostalgia is real!" },
    { id: 3, user: "BassHead", avatar: avatars[2], text: "Who else loves deep bass and experimental soundscapes?" },
    { id: 4, user: "DJSpin", avatar: avatars[3], text: "Got a new set ready for the weekend—feeling the energy!" },
    { id: 5, user: "RaveVibes", avatar: avatars[4], text: "Raving to techno all night, the beats keep me going!" },
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
      <h1 className="text-2xl font-bold mb-4">Electronic Beats Chat</h1>

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
          placeholder="Share your latest beats, tracks, or festival experiences..."
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

export default ElectronicBeatsChat;
