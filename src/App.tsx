import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ChannelList from "./components/ChannelList";
import GeneralChat from "./components/GeneralChat";
import RandomChat from "./components/RandomChat";
import TechTalkChat from "./components/TechTalkChat";
import DownloadModal from "./components/DownloadModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Wumpus from "./components/Wumpus";
import ServerPage from "./pages/ServerPage";
import MessagePage from "./pages/ChannelPage";

function App() {
  const [activeServerId, setActiveServerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servers, setServers] = useState<{ id: number; name: string }[]>([
    { id: 87437654753456, name: "Static Server" },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddServer = () => {
    const serverName = window.prompt("Enter the name for your new server:");
    if (serverName) {
      const newServer = { id: Date.now(), name: serverName };
      setServers([...servers, newServer]);
    }
  };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          setActiveServerId={setActiveServerId}
          activeServerId={activeServerId}
          openModal={openModal}
          servers={servers}
          handleAddServer={handleAddServer}
        />

        {/* Server and Channel Layout */}
        <div className="flex-grow flex">
          {/* Server Content */}
          <div className="w-60 bg-[#2b2d31]">
            <Routes>
              {servers.map((server) => (
                <Route
                  key={server.id}
                  path={`/server/${server.id}/*`}
                  element={<ServerPage server={server} />}
                />
              ))}
              <Route path="/" element={<ChannelList />} />
              <Route path="/general" element={<ChannelList />} />
              <Route path="/random" element={<ChannelList />} />
              <Route path="/tech-talk" element={<ChannelList />} />
              <Route path="/wumpus" element={<ChannelList />} />
            </Routes>
            <Footer />
          </div>

          {/* Main Content Area */}
          <div className="flex-grow flex flex-col bg-[#313338]">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/general" element={<GeneralChat />} />
              <Route path="/random" element={<RandomChat />} />
              <Route path="/tech-talk" element={<TechTalkChat />} />
              <Route path="/wumpus" element={<Wumpus />} />
              {servers.map((server) => (
                <Route
                  key={server.id}
                  path={`/server/${server.id}/channel/:channelId`}
                  element={<MessagePage />}
                />
              ))}
            </Routes>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && <DownloadModal closeModal={closeModal} isOpen={isModalOpen} />}
      </div>
    </Router>
  );
}

export default App;
