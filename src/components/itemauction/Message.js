import React from "react";

const Message = ({ message: { text, address } }) => {
  const userNick = sessionStorage.getItem("user_nickname");
  const token = sessionStorage.getItem("auth_token");

  const byCurrentUser = false;

  const currentUser = token;
  if (address === token) {
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
        <span className="ChatUser">{address}</span>
        <span className="ChatMsg">{text}</span>
      </div>
    </li>
  );
};

export default Message;
