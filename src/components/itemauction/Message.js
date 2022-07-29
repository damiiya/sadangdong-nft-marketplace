import React, { useEffect, useState } from "react";

const Message = (props) => {
  const [byUser, setByUser] = useState(false);
  const nickname = sessionStorage.getItem("user_nickname");

  useEffect(() => {
    if (props.name == nickname) {
      setByUser(true);
    }
  });

  return byUser ? (
    <li className="Sent">
      <p className="ChatUser">{props.name}</p>
      <p className="ChatMsg">{props.message}</p>
    </li>
  ) : (
    <li className="Received">
      <p className="ChatUser">{props.name}</p>
      <p className="ChatMsg">{props.message}</p>
    </li>
  );
};

export default Message;
