import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface ServerPageProps {
  server: { _id: number; name: string };
  userDetails: { _id: number; username: string };
}

const ServerPage: React.FC<ServerPageProps> = ({ server, userDetails }) => {
  const urlPathname = useLocation().pathname;
  const currPath = urlPathname.split('/')[2];

  const [channels, setChannels] = useState<{ _id: number; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState("");

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
  }, [currPath]);

  const handleCreateChannel = async () => {
    if (newChannelName && newChannelType) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}api/channels/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newChannelName,
              serverId: server._id,
              type: newChannelType,
              owner: userDetails._id,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create channel");
        }
        const newChannel = await response.json();
        setIsModalOpen(false);
        setNewChannelName("");
        setNewChannelType("");
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
                className="flex items-center p-2 bg-[#1e1f22] rounded-md hover:border hover:border-blue-500"
              >
                <Link
                  to={`/server/${server._id}/channel/${channel._id}`}
                  state={{ channelName: channel.name, userId: userDetails._id, username: userDetails.username }}
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
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
        >
          Create Channel
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Create a New Channel</h3>
            <div className="mb-4">
              <label htmlFor="channelName" className="block text-gray-700 font-medium mb-2">
                Channel Name
              </label>
              <input
                type="text"
                id="channelName"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="channelType" className="block text-gray-700 font-medium mb-2">
                Channel Type
              </label>
              <input
                type="text"
                id="channelType"
                value={newChannelType}
                onChange={(e) => setNewChannelType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChannel}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
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
