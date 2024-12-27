import React, { useState, useEffect } from "react";

const WebSocketClient = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [channelId, setChannelId] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ senderId: string; content: string; timestamp: Date }>>([]);

  // Open a WebSocket connection when the component mounts
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000"); // WebSocket URL
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setWs(socket);
    };

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.event === "receiveMessage") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: data.payload.senderId,
            content: data.payload.content,
            timestamp: new Date(data.payload.timestamp),
          },
        ]);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup the WebSocket connection on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const joinChannel = () => {
    if (ws && channelId) {
      const payload = {
        event: "joinChannel",
        payload: { 
            channelId,
            userId : "Barath"
        },
      };
      ws.send(JSON.stringify(payload)); // Send joinChannel event
    }
  };

  const sendMessage = () => {
    if (ws && message) {
      const payload = {
        event: "sendMessage",
        payload: {
          channelId,
          senderId: "user1", // Example user ID
          username: "User 1", // Example username
          content: message,
        },
      };
      ws.send(JSON.stringify(payload)); // Send message event
      setMessage(""); // Clear message after sending
    }
  };

  return (
    <div>
      {/* <h1>WebSocket Client</h1>
      <div>
        <input
          type="text"
          placeholder="Enter channel ID"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
        />
        <button onClick={joinChannel}>Join Channel</button>
      </div>
      <div>
        <textarea
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>

      <div>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}</strong>: {msg.content} <br />
            <em>{msg.timestamp.toLocaleString()}</em>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default WebSocketClient;