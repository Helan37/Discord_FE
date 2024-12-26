import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ServerPageProps {
  server: { _id: number; name: string };
  userDetails: { _id: number; username: string };
}

const ServerPage: React.FC<ServerPageProps> = ({ server, userDetails }) => {

  const [channels, setChannels] = useState<{ _id: number; name: string }[]>([]);
  const getChannels = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/server/get/${server._id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch channels");
    }
    const channels = await response.json();
    console.log(channels);
    setChannels(channels.channels);
  }

  useEffect(() => {
    getChannels();
  }
  , []);

  const handleCreateChannel = async() => {
    const channelName = window.prompt("Enter the name for your new text channel:");
    const channelType = window.prompt("Enter the type for your new text channel:");

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
          onClick={handleCreateChannel}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default ServerPage;
