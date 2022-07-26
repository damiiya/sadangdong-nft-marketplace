import React from "react";

const Message = ({ message: { text, user } }) => {
  const usernick = sessionStorage.getItem("user_nickname");

  const byCurrentUser = false;

  const currentUser = usernick;
  if (user === usernick) {
    byCurrentUser = true;
  }

  return byCurrentUser ? (
    <li className="Sent">
      <div className="ChatWrap">
        <span className="ChatUser">{currentUser}</span>
        <span className="ChatMsg">{text}</span>
      </div>
    </li>
  ) : (
    <li className="Received">
      <div className="ChatWrap">
        <span className="ChatUser">{user}</span>
        <span className="ChatMsg">{text}</span>
      </div>
    </li>
  );
};

export default Message;
