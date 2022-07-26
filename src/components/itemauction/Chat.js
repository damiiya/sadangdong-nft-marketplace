import React, { useState, useEffect, useCallback } from "react";
import Message from "./Message";
import uparrow from "../../assets/icon/uparrow.png";
import { io } from "socket.io-client";
import { serverUrl } from "../../shared/api";
// import axios from "axios";

const token = sessionStorage.getItem("auth_token");

let socket;
// 소켓연결
// const server = `${serverUrl}/chat`;
// const socket = io.connect("http://3.88.21.23:3001/chat");
const server = `${serverUrl}/hello`;

const Chat = (props) => {
  // const [users, setUsers] = useState("");
  console.log(props.data.data.auction_id);
  // const [room, setRoom] = useState("");
  const [address, setAddress] = useState("");
  const [auction_id, setAuction_id] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // const data = {
  //   address,
  //   auction_id,
  //   message,
  // };

  socket = io(server);

  // auction_id로 룸 생성
  useEffect(() => {
    socket = io(server);
    socket.emit("joinRoom", `${props.data.data.auction_id}`, (error) => {
      // console.log("error");
      // 에러 처리
      if (error) {
        alert(error);
      }
    });
  }, [socket]); // 한번만 부른다

  // const data = {
  //   address: token,
  //   auction_id: props.data.data.auction_id,
  //   message,
  // };

  useEffect(() => {
    // 서버에서 message 이벤트가 올 경우에 대해서 `on`

    socket.on("recMessage", (data) => {
      console.log(data);
      setMessages([...messages, message]);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, [messages]);

  // 메세지 보내기 함수
  const sendMessage = (e) => {
    console.log(message);
    console.log(address);
    if (message && token) {
      socket.emit("sendMessage", {
        address: token,
        auction_id: props.data.data.auction_id,
        message: message,
      });
      console.log("sent message: " + JSON.stringify(message));
    }
  };

  console.log(message, messages);
  // console.log(users, "users");

  // return <h1>Chat</h1>;
  // 1.roominfo
  // 2.messages
  // 3.input
  const token = sessionStorage.getItem("auth_token");

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
          {/* <div value={props.address}></div> */}
          <input
            className="AuctionChattingInput"
            placeholder="메세지를 입력해주세요."
            id={props.address}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setAddress(e.target.id);
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
