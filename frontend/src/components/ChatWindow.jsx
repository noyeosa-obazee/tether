import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import "../App.css";

const ChatWindow = ({ chat }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const friend = chat?.participants?.find((p) => p.id !== user.id);

  useEffect(() => {
    if (chat?.id) {
      fetchMessages();
    }
  }, [chat.id]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${chat.id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      // Optimistic UI:  append the message immediately here before the server replies
      // But for now, I will wait for the server response
      setIsSending(true);
      const res = await api.post("/messages", {
        conversationId: chat.id,
        content: newMessage,
      });

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      toast.error("Failed to send");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            className="avatar-circle"
            style={{ width: "35px", height: "35px", fontSize: "1rem" }}
          >
            {(friend?.username || "?").charAt(0).toUpperCase()}
          </div>
          <span>{friend?.username || "Unknown User"}</span>
        </div>
      </div>

      <div className="messages-area">
        {messages.map((msg) => {
          const isMe = msg.senderId === user.id;
          return (
            <div
              key={msg.id}
              className={`message-bubble ${isMe ? "me" : "friend"}`}
            >
              {msg.content}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn-send">
          {isSending ? (
            <div className="loading">
              <ClipLoader size={20} color="white" />
            </div>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
