import React from "react";

const DownloadModal: React.FC<{ closeModal: () => void; isOpen: boolean }> = ({ closeModal, isOpen }) => {
  if (!isOpen) return null;

  const platforms = [
    { name: "Windows", logo: "/images/windows.png", url: "https://discord.com/download" },
    { name: "Mac", logo: "/images/mac.png", url: "https://discord.com/download" },
    { name: "Linux", logo: "/images/linux.png", url: "https://discord.com/download" },
    { name: "iOS", logo: "/images/ios.png", url: "https://discord.com/download" },
    { name: "Android", logo: "/images/android.png", url: "https://discord.com/download" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl h-auto rounded-lg shadow-lg p-8 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-700 text-2xl hover:text-gray-900 transition-colors"
        >
          ×
        </button>
        <h2 className="text-gray-900 text-3xl font-semibold mb-6 text-center">Download Discord</h2>
        <div className="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="bg-gray-50 rounded-lg p-4 flex flex-col items-center space-y-4 hover:shadow-black hover:text-white transition-all duration-200 cursor-pointer shadow-md transform hover:scale-105"
            >
              <h3 className="text-gray-900 text-xl font-semibold">{platform.name}</h3>
              <img src={platform.logo} alt={`${platform.name} logo`} className="h-12 w-12" />
              <p className="text-gray-600 text-sm">Download Discord for {platform.name}</p>
              <a href={platform.url} target="_blank" rel="noopener noreferrer">
                <button className="bg-[#7289da] text-white px-6 py-2 rounded-lg text-lg font-medium transition-transform transform hover:scale-105 hover:opacity-80">
                  Download
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
