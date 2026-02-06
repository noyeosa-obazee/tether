import { useState } from "react";
import Sidebar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="dashboard-container">
      <Sidebar onSelectChat={setSelectedChat} />
      {selectedChat ? (
        <ChatWindow chat={selectedChat} />
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
