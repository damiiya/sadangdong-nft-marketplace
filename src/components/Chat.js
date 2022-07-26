import React, { useState, useEffect, useCallback } from "react";
import Message from "./Message";
import uparrow from "../assets/icon/uparrow.png";
import { io } from "socket.io-client";
import { serverUrl } from "../shared/api";
// import axios from "axios";

const token = sessionStorage.getItem("auth_token");

let socket;
// 소켓연결
// const server = `${serverUrl}/chat`;
// const socket = io.connect("http://3.88.21.23:3001/chat");
const server = `${serverUrl}/hello`;

const Chat = (props) => {
  const room = props.token_id;
  //   const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState("");
  socket = io(server);

  //   useEffect(() => {
  //     socket = io(server);
  //     socket.emit("join", { room }, (error) => {
  //       // console.log("error");
  //       // 에러 처리
  //       if (error) {
  //         alert(error);
  //       }
  //     });
  //   }, [socket]); // 한번만 부른다

  //   useEffect(() => {
  //     // 서버에서 message 이벤트가 올 경우에 대해서 `on`
  //     socket.on("message", (message) => {
  //       setMessages([...messages, message]);
  //     });

  //     socket.on("roomData", ({ users }) => {
  //       setUsers(users);
  //     });
  //   }, [messages]);

  // 메세지 보내기 함수
  const sendMessage = (e) => {
    e.preventDefault();
    // if (message) {
    //   socket.emit("sendMessage", message, setMessage(""));
    // }
  };

  console.log(message, messages);
  console.log(users, "users");

  // return <h1>Chat</h1>;
  // 1.roominfo
  // 2.messages
  // 3.input

  return (
    <div className="AuctionChattingContainer">
      <div className="AuctionDisplayContainer">
        <ul className="ChatLists">
          {messages.map((message, i) => (
            <Message key={i} message={message} />
          ))}
        </ul>
      </div>
      <div className="AuctionChattingInputWrapper">
        <div className="AuctionChattingInputBackGround">
          <input
            className="AuctionChattingInput"
            placeholder="메세지를 입력해주세요."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <img className="UpArrowImg" src={uparrow} onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
