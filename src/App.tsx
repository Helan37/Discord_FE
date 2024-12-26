import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
import FortniteCrewChat from "./components/FortniteCrewChat";
import CreativeCodersChat from "./components/CreativeCodersChat";
import ArtAndDesignChat from "./components/ArtAndDesignChat";
import ElectronicBeatsChat from "./components/ElectronicBeatsChat";
import HipHopChat from "./components/HipHopChat";
import IndieMusicLoversChat from "./components/IndieMusicLoversChat";
import MinecraftBuildersChat from "./components/MinecraftBuildersChat";
import OverwatchLeagueChat from "./components/OverwatchLeagueChat";
import TechCommunityChat from "./components/TechCommunityChat";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeServerId, setActiveServerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servers, setServers] = useState<{ id: number; name: string }[]>([]);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      fetch("https://discord-backend-hkbq.onrender.com/api/users/verifytoken", {
        method: "POST",
        headers: { Authorization: `${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setIsAuthenticated(true);
            console.log(data);
            fetchUserDetails(data.decoded.userId);
          } else {
            handleLogout();
          }
        })
        .catch(()=>handleLogout());
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(
      `https://discord-backend-hkbq.onrender.com/api/users/profile/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const user = await response.json();
    console.log(user);
    setUserDetails(user);
  } catch (error) {
    console.error(error);
    setUserDetails(null); 
  }
};


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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDetails(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
        </Routes>
      ) : (
        <div className="flex h-screen">
          <Sidebar
            setActiveServerId={setActiveServerId}
            activeServerId={activeServerId}
            openModal={openModal}
            servers={servers}
            handleAddServer={handleAddServer}
          />
          <div className="flex-grow flex">
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
                <Route path="/channels/tech-community" element={<ChannelList />} />
                <Route path="/channels/art-and-design" element={<ChannelList />} />
                <Route path="/channels/creative-coders" element={<ChannelList />} />
                <Route path="/channels/overwatch-league" element={<ChannelList />} />
                <Route path="/channels/minecraft-builders" element={<ChannelList />} />
                <Route path="/channels/fortnite-crew" element={<ChannelList />} />
                <Route path="/channels/indie-music-lovers" element={<ChannelList />} />
                <Route path="/channels/electronic-beats" element={<ChannelList />} />
                <Route path="/channels/hip-hop-central" element={<ChannelList />} />
              </Routes>
              <Footer
                setIsAuthenticated={setIsAuthenticated}
                handleLogout={handleLogout}
                userDetails={userDetails}
              />
            </div>
            <div className="flex-grow flex flex-col bg-[#313338]">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/general" element={<GeneralChat />} />
                <Route path="/random" element={<RandomChat />} />
                <Route path="/tech-talk" element={<TechTalkChat />} />
                <Route path="/wumpus" element={<Wumpus />} />
                <Route
                  path="/channels/tech-community"
                  element={<TechCommunityChat />}
                />
                <Route
                  path="/channels/art-and-design"
                  element={<ArtAndDesignChat />}
                />
                <Route
                  path="/channels/creative-coders"
                  element={<CreativeCodersChat />}
                />
                <Route
                  path="/channels/overwatch-league"
                  element={<OverwatchLeagueChat />}
                />
                <Route
                  path="/channels/minecraft-builders"
                  element={<MinecraftBuildersChat />}
                />
                <Route
                  path="/channels/fortnite-crew"
                  element={<FortniteCrewChat />}
                />
                <Route
                  path="/channels/indie-music-lovers"
                  element={<IndieMusicLoversChat />}
                />
                <Route
                  path="/channels/electronic-beats"
                  element={<ElectronicBeatsChat />}
                />
                <Route path="/channels/hip-hop-central" element={<HipHopChat />} />
              </Routes>
            </div>
          </div>
          <DownloadModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
      )}
    </Router>
  );
}

export default App;
