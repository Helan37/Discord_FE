import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ChannelPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const path = location.pathname.split("/")[4];
  const channelName = location.state?.channelName || `Channel ${channelId}`;
  const userId = location.state?.userId || "Unknown Id";
  const username = location.state?.username || "Unknown Name";
  const [userInChannel, setUserInChannel] = useState(false);
  // const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const userProfile = "/images/avatars/9.jpg";

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  // const [channelId_, setChannelId] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{
      senderId: string;
      username: string;
      content: string;
      timestamp: Date;
    }>
  >([]);
  console.log(messages);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000"); // WebSocket URL
    socket.onopen = () => {
      console.log("Connected to WebSocket server !!!!!");
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
            username: data.payload.username,
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

    return () => {
      if (socket) {
        console.log("Close the WebSocket !!!!!");
        socket.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (ws && newMessage) {
      const payload = {
        event: "sendMessage",
        payload: {
          channelId,
          senderId: userId,
          username,
          content: newMessage,
        },
      };
      ws.send(JSON.stringify(payload));
      setNewMessage("");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/messages/${channelId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error(error);
    }
  };

  const chechUserInThisChannel = async () => {
    try {
      // fetch the channel details
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/channels/get/${channelId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch channel details");
      }
      const channel = await response.json();
      console.log(channel, userId);
      if (
        channel.members.some((member: { _id: string }) => member._id === userId)
      ) {
        setUserInChannel(true);
        console.log(ws, channelId);
        if (ws && channelId) {
          console.log("Join the channel WebSocket");
          const payload = {
            event: "joinChannel",
            payload: {
              channelId,
              userId: userId,
              username: username,
            },
          };
          ws.send(JSON.stringify(payload));
          setMessages([]);
        }
        console.log("User is in this channel");
        // fetchMessages();
      } else {
        setUserInChannel(false);
        console.log("User is not in this channel");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const HandleJoinChannelUser = async () => {
    try {
      console.log("Join the channel");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/channels/add-member`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelId, userId }),
        }
      );
      setUserInChannel(true);
      // fetchMessages();

      if (ws && channelId) {
        const payload = {
          event: "joinChannel",
          payload: {
            channelId,
            userId: userId,
          },
        };
        ws.send(JSON.stringify(payload));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
        return;
      }
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    chechUserInThisChannel();
    // fetchMessages();
  }, [channelId, path]);

  return (
    <div className="flex flex-col h-screen bg-[#313338]">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-2xl font-bold text-white">
          Channel: {channelName}
        </h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {userInChannel ? (
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg ${
                    username === message.username
                      ? "bg-blue-600 text-white justify-end"
                      : "bg-gray-700 text-gray-300 justify-start"
                  }`}
                >
                  {/* Profile Image */}
                  <img
                    src={userProfile}
                    alt="User Profile"
                    className={`w-10 h-10 rounded-full ${
                      username === message.username ? "order-2 ml-4" : "mr-4"
                    }`}
                  />

                  {/* Message Content */}
                  <div
                    className={`flex flex-col ${
                      username === message.username
                        ? "items-start"
                        : "items-start"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold capitalize ${
                        username === message.username
                          ? "text-blue-200"
                          : "text-gray-300"
                      }`}
                    >
                      {username === message.username ? "You" : message.username}
                    </span>
                    <p
                      className={`mt-0  ${
                        username === message.username
                          ? "text-white"
                          : "text-gray-200"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No messages yet</div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-4 flex h-full w-full items-center rounded-full cursor-pointer gap-6 flex-col justify-center">
            <div>You'r not a member of this channel</div>
            <div
              className="px-4 py-1 bg-green-400 text-white text-md"
              onClick={HandleJoinChannelUser}
            >
              Join the channel
            </div>
          </div>
        )}
      </div>
      {userInChannel && (
        <div className="p-4 border-t border-gray-600">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 rounded-lg border border-gray-600 text-white bg-gray-800 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
