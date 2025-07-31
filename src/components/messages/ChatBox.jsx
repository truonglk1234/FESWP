import React from "react";

const ChatBox = ({ selectedUser, messages, input, setInput, handleSend }) => {
  return (
    <div className="messages-chat">
      <div className="chat-header">
        <h3>{selectedUser}</h3>
      </div>
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "Bạn" ? "sent" : "received"}`}
          >
            <div className="bubble">
              <strong>{msg.sender}: </strong>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
};

export default ChatBox;
