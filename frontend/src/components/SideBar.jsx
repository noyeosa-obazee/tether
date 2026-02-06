import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const conversations = [
    { id: 1, name: "Superman", lastMessage: "See you tomorrow!" },
    { id: 2, name: "Wonder Woman", lastMessage: "Meeting is at 5." },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="avatar-circle">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <span>{user?.username}</span>
        </div>
        <button
          onClick={logout}
          className="btn-primary"
          style={{ padding: "5px 10px", fontSize: "0.8rem" }}
        >
          Logout
        </button>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
        />
      </div>

      <div className="conversation-list">
        {conversations.map((chat) => (
          <div key={chat.id} className="conversation-item">
            <div
              className="avatar-circle"
              style={{
                backgroundColor: "#ccc",
                width: "35px",
                height: "35px",
                fontSize: "1rem",
              }}
            >
              {chat.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>{chat.name}</div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                {chat.lastMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
