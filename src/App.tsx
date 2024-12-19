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

function App() {
  const [activeServerId, setActiveServerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar
          setActiveServerId={setActiveServerId}
          activeServerId={activeServerId}
          openModal={openModal}
        />
        
        <ChannelList />
        
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/channel/general" element={<GeneralChat />} />
            <Route path="/channel/random" element={<RandomChat />} />
            <Route path="/channel/tech-talk" element={<TechTalkChat />} />
          </Routes>
        </div>

        {/* Modal for Download Options */}
        {isModalOpen && <DownloadModal closeModal={closeModal} isOpen={isModalOpen} />}
      </div>
    </Router>
  );
}

export default App;
