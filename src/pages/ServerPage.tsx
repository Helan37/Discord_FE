import { useState } from "react";
import { Link } from "react-router-dom";

interface ServerPageProps {
  server: { id: number; name: string };
}

const ServerPage: React.FC<ServerPageProps> = ({ server }) => {
  const [channels, setChannels] = useState<{ id: number; name: string }[]>([]);

  const handleCreateChannel = () => {
    const channelName = window.prompt("Enter the name for your new text channel:");
    if (channelName) {
      const newChannel = { id: Date.now(), name: channelName };
      setChannels([...channels, newChannel]);
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
                key={channel.id}
                className="flex items-center p-2 bg-[#1e1f22] rounded-md hover:border hover:border-blue-500"
              >
                <Link
                  to={`/server/${server.id}/channel/${channel.id}`}
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
