import React from "react";
import { Link } from "react-router-dom";

interface DiscoverModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const DiscoverModal: React.FC<DiscoverModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: "Home",
      channels: [
        {
          name: "Tech Community",
          imageUrl: "/images/tech.jpeg",
          membersCount: 1234,
          description: "A space for tech enthusiasts to connect and discuss the latest trends.",
          path: "/channels/tech-community",
        },
        {
          name: "Art and Design",
          imageUrl: "/images/art.webp",
          membersCount: 432,
          description: "Explore and share your creativity with fellow artists and designers.",
          path: "/channels/art-and-design",
        },
        {
          name: "Creative Coders",
          imageUrl: "/images/coding.jpg",
          membersCount: 345,
          description: "For developers who love to code and create cool stuff.",
          path: "/channels/creative-coders",
        },
      ],
    },
    {
      title: "Gaming",
      channels: [
        {
          name: "Overwatch League",
          imageUrl: "/images/overwatch.jpg",
          membersCount: 2567,
          description: "Join the competitive community of Overwatch players from around the world.",
          path: "/channels/overwatch-league",
        },
        {
          name: "Minecraft Builders",
          imageUrl: "/images/minecraft.jpg",
          membersCount: 987,
          description: "Collaborate on massive builds and share your Minecraft creations.",
          path: "/channels/minecraft-builders",
        },
        {
          name: "Fortnite Crew",
          imageUrl: "/images/fort.jpeg",
          membersCount: 4321,
          description: "A place for Fortnite enthusiasts to join forces and conquer battles.",
          path: "/channels/fortnite-crew",
        },
      ],
    },
    {
      title: "Music",
      channels: [
        {
          name: "Indie Music Lovers",
          imageUrl: "/images/indie.avif",
          membersCount: 789,
          description: "A place for fans of indie music to share and discover new tracks.",
          path: "/channels/indie-music-lovers",
        },
        {
          name: "Electronic Beats",
          imageUrl: "/images/beats.jpg",
          membersCount: 321,
          description: "For fans of electronic music, from chill vibes to upbeat anthems.",
          path: "/channels/electronic-beats",
        },
        {
          name: "Hip Hop Central",
          imageUrl: "/images/hip-hop.jpg",
          membersCount: 654,
          description: "For lovers of all things hip hop, rap, and R&B.",
          path: "/channels/hip-hop-central",
        },
      ],
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl h-auto rounded-lg shadow-lg p-8 relative overflow-hidden">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-700 text-2xl transition-colors"
        >
          ×
        </button>
        <h2 className="text-gray-900 text-3xl font-semibold mb-6 text-center">Discover Channels</h2>

        <div className="overflow-y-auto max-h-[80vh]">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {section.channels.map((channel, channelIndex) => (
                  <Link
                    key={channelIndex}
                    to={channel.path}
                    className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col items-center relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-3xl hover:bg-discord hover:text-white"
                    onClick={closeModal}  // Close modal when a channel is clicked
                  >
                    <img
                      src={channel.imageUrl}
                      alt={channel.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <div className="text-center flex flex-col justify-between h-full">
                      <span className="text-lg font-medium text-gray-900 hover:text-white">{channel.name}</span>
                      <p className="text-sm text-gray-900 mt-2 pb-4 hover:text-white">{channel.description}</p>
                      <span className="absolute bottom-4 left-4 text-xs text-gray-900 hover:text-white">
                        {channel.membersCount} members
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverModal;
