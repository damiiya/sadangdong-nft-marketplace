import React, { useEffect, useState } from "react";

const Message = ({ message: { text, user }, name }) => {
  const [byUser, setByUser] = useState(false);
  const nickname = sessionStorage.getItem("user_nickname");

  useEffect(() => {
    if (name == nickname) {
      setByUser(true);
    }
  }, []);

  return byUser ? (
    <li className="Sent">
      <p className="ChatUser">{name}</p>
      <p className="ChatMsg">{text}</p>
    </li>
  ) : (
    <li className="Received">
      <p className="ChatUser">{user}</p>
      <p className="ChatMsg">{text}</p>
    </li>
  );
};

export default Message;
