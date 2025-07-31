import React from "react";

const ChatBox = ({
  selectedUser,
  messages,
  input,
  setInput,
  handleSend,
  chatEnded,
  handleEndChat,
  opponentTyping,
}) => {
  return (
    <div className="messages-chat">
      <div className="chat-header">
        <h3>{selectedUser}</h3>
        {!chatEnded && (
          <button className="end-btn" onClick={handleEndChat}>
            Kết thúc
          </button>
        )}
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

        {opponentTyping && !chatEnded && (
          <div className="chat-typing-indicator">
            {selectedUser} đang soạn tin nhắn...
          </div>
        )}

        {chatEnded && (
          <div className="chat-ended-msg">
            Cuộc tư vấn đã kết thúc.
          </div>
        )}
      </div>

      {!chatEnded && (
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
      )}
    </div>
  );
};

export default ChatBox;
