import { useState } from "react";
import Sidebar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <div
        className={`sidebar-wrapper ${!isSidebarOpen ? "closed" : ""} ${selectedChat ? "mobile-hidden" : ""}`}
      >
        <Sidebar onSelectChat={setSelectedChat} />
      </div>
      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      ) : (
        <div className="chat-window empty-state">
          <div style={{ margin: "auto", textAlign: "center", color: "#888" }}>
            <h3>Select a conversation</h3>
            <p>Choose a friend from the sidebar to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
