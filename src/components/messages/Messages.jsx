import React, { useState, useRef } from "react";
import "./Messages.css";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const Messages = () => {
  const [users] = useState(["Khách hàng A", "Khách hàng B", "Khách hàng C"]);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const [messages, setMessages] = useState([
    { sender: "Bạn", text: "Xin chào!" },
    { sender: "Tư vấn viên", text: "Chào bạn, tôi có thể giúp gì?" }
  ]);
  const [input, setInput] = useState("");

  // --- Resize Sidebar ---
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const isResizing = useRef(false);

  const startResizing = () => (isResizing.current = true);
  const stopResizing = () => (isResizing.current = false);

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      // Giới hạn chiều rộng sidebar (min: 180px, max: 400px)
      setSidebarWidth(Math.min(Math.max(e.clientX, 180), 400));
    }
  };

  // --- Gửi tin nhắn ---
  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "Bạn", text: input }]);
    setInput("");
  };

  return (
    <div
      className="messages-container"
      onMouseMove={handleMouseMove}
      onMouseUp={stopResizing}
    >
      {/* Sidebar */}
      <div
        className="messages-sidebar"
        style={{ width: sidebarWidth }}
      >
        <ChatList
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <div
          className="resize-handle"
          onMouseDown={startResizing}
        />
      </div>

      {/* Chat Box */}
      <ChatBox
        selectedUser={selectedUser}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Messages;
