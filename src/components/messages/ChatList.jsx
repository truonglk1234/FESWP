import React from "react";

const ChatList = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div className="chat-list">
      <h3>Danh sách hội thoại</h3>
      <ul>
        {users.map((name) => (
          <li
            key={name}
            className={selectedUser === name ? "active" : ""}
            onClick={() => setSelectedUser(name)}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`}
              alt={name}
              className="avatar"
            />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
