import { useState, useEffect } from "react";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import EditProfileModal from "./EditProfileModal";

const Sidebar = ({ onSelectChat }) => {
  const { user, logout } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/conversations");
      setConversations(res.data);
    } catch (err) {
      toast.error("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      setLoading(true);
      try {
        const res = await api.get(`/users?search=${term}`);
        setSearchResults(res.data);
      } catch (err) {
        toast.error("Failed to search");
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const startChat = async (participantId) => {
    try {
      const res = await api.post("/conversations", { participantId });

      const newChat = res.data;
      onSelectChat(newChat);

      setSearchTerm("");
      setSearchResults([]);
      // fetchConversations();
    } catch (err) {
      toast.error("Could not start chat");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-profile">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="avatar-circle"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="avatar-circle">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{user?.username}</span>

            <span
              style={{
                fontSize: "0.75rem",
                color: "#666",
                fontWeight: "normal",
              }}
            >
              {user?.about || "No bio yet"}
            </span>
          </div>
        </div>
        <div className="btn-flex">
          <button
            onClick={() => setShowProfileModal(true)}
            className="btn-primary edit-btn"
            style={{
              padding: "4px 10px",
              fontSize: "0.8rem",
            }}
          >
            <small>Edit Profile</small>
          </button>

          <button
            onClick={logout}
            className="btn-primary log-out"
            style={{ padding: "4px 10px", fontSize: "0.8rem" }}
          >
            <small>Log Out</small>
          </button>
        </div>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="conversation-list">
        {searchTerm.length > 0 ? (
          <div>
            {loading && (
              <div className="loading">
                <ClipLoader size={20} />
              </div>
            )}
            {searchResults.map((u) => (
              <div
                key={u.id}
                onClick={() => startChat(u.id)}
                className="conversation-item"
              >
                <div className="avatar-circle" style={{ background: "#ccc" }}>
                  {u.username.charAt(0)}
                </div>
                <div>{u.username}</div>
              </div>
            ))}
            {!loading && searchResults.length === 0 && (
              <div style={{ padding: "10px", color: "#666" }}>
                No users found
              </div>
            )}
          </div>
        ) : loading ? (
          <div className="loading">
            <ClipLoader size={20} />
          </div>
        ) : (
          conversations.map((chat) => {
            const friend = chat.participants.find((p) => p.id !== user.id);
            const lastMsg = chat.messages[0]?.content || "No messages yet";
            return (
              <div
                key={chat.id}
                className="conversation-item"
                onClick={() => startChat(friend.id)}
              >
                <div
                  className="avatar-circle"
                  style={{
                    backgroundColor: "#ccc",
                    width: "35px",
                    height: "35px",
                    fontSize: "1rem",
                  }}
                >
                  {friend?.username.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: "600" }}>{friend?.username}</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    {lastMsg}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showProfileModal && (
        <EditProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
};

export default Sidebar;
