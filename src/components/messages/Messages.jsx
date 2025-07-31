import React, { useState, useRef } from "react";
import "./Messages.css";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const Messages = () => {
  const [users] = useState(["Khách hàng A", "Khách hàng B", "Khách hàng C"]);
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState([
    { sender: "Bạn", text: "Xin chào!" },
    { sender: "Tư vấn viên", text: "Chào bạn, tôi có thể giúp gì?" },
  ]);
  const [input, setInput] = useState("");
  const [chatEnded, setChatEnded] = useState(false);
  const [opponentTyping, setOpponentTyping] = useState(false);

  const [sidebarWidth, setSidebarWidth] = useState(250);
  const isResizing = useRef(false);

  const startResizing = () => (isResizing.current = true);
  const stopResizing = () => (isResizing.current = false);
  const handleMouseMove = (e) => {
    if (isResizing.current) {
      setSidebarWidth(Math.min(Math.max(e.clientX, 180), 400));
    }
  };

  const handleSend = () => {
    if (input.trim() === "" || chatEnded) return;
    setMessages([...messages, { sender: "Bạn", text: input }]);
    setInput("");
    setOpponentTyping(true);
    setTimeout(() => setOpponentTyping(false), 2000);
  };

  const handleEndChat = () => {
    setChatEnded(true);
  };

  return (
    <div
      className="messages-container"
      onMouseMove={handleMouseMove}
      onMouseUp={stopResizing}
    >
      <div className="messages-sidebar" style={{ width: sidebarWidth }}>
        <ChatList
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <div className="resize-handle" onMouseDown={startResizing} />
      </div>

      <ChatBox
        selectedUser={selectedUser}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        chatEnded={chatEnded}
        handleEndChat={handleEndChat}
        opponentTyping={opponentTyping}
      />
    </div>
  );
};

export default Messages;
