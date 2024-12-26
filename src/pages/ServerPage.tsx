import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ServerPageProps {
  server: { _id: number; name: string };
  userDetails: { _id: number; username: string };
}

const ServerPage: React.FC<ServerPageProps> = ({ server, userDetails }) => {
  const [channels, setChannels] = useState<{ _id: number; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("text");

  const getChannels = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/server/get/${server._id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch channels");
    }
    const channels = await response.json();
    setChannels(channels.channels);
  };

  useEffect(() => {
    getChannels();
  }, []);

  const handleCreateChannel = async () => {
    if (channelName && channelType) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}api/channels/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: channelName,
              serverId: server._id,
              type: channelType,
              owner: userDetails._id,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create channel");
        }
        const newChannel = await response.json();
        setChannelName("");
        setChannelType("text");
        setIsModalOpen(false);
        getChannels();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    }
  };

  return (
    <div className="p-6 w-60 bg-[#2b2d31] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">{server.name}</h2>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Channels</h3>
        <div className="space-y-2">
          {channels.length > 0 ? (
            channels.map((channel) => (
              <div
                key={channel._id}
                className="flex items-center p-2 bg-[#1e1f22] rounded-md hover:border hover:border-discord"
              >
                <Link
                  to={`/server/${server._id}/channel/${channel._id}`}
                  state={{ channelName: channel.name }}
                  className="text-blue-400 hover:underline flex-grow"
                >
                  {channel.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No channels yet</div>
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-discord hover:bg-opacity-50 text-white py-2 px-4 rounded-md w-full"
        >
          Create Channel
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#2b2d31] p-6 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold text-white mb-4">Create a text based Channel</h3>
            <label className="block text-gray-300 mb-2">Channel Name</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full p-2 mb-4 rounded-md bg-[#1e1f22] text-white border border-gray-500"
              placeholder="Enter channel name"
            />
            <label className="block text-gray-300 mb-2">Channel Type</label>
            <div className="mb-4">
              <label className="flex items-center text-gray-300 mb-2">
                <input
                  type="radio"
                  value="text"
                  checked={channelType === "text"}
                  onChange={() => setChannelType("text")}
                  className="mr-2"
                />
                Public
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  value="voice"
                  checked={channelType === "voice"}
                  onChange={() => setChannelType("voice")}
                  className="mr-2"
                />
                Private
              </label>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 bg-gray-500 hover:bg-gray-400 text-white py-1 px-3 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChannel}
                className="bg-discord hover:bg-opacity-50 text-white py-1 px-3 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerPage;
