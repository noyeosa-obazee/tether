import React from "react";
import "../App.css";

const ChatWindow = () => {
  return (
    <div className="chat-window">
      <div className="chat-header">Superman</div>

      <div className="messages-area">
        <div className="message-bubble friend">
          Hey! Are we still on for the mission?
        </div>
        <div className="message-bubble me">
          Yes, I am preparing the Batmobile now.
        </div>
        <div className="message-bubble friend">
          Great, bring the kryptonite just in case.
        </div>
        <div className="message-bubble me">Way ahead of you.</div>
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
        />
        <button className="btn-send">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
