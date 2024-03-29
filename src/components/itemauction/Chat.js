import React, { useState, useEffect } from "react";
import Message from "./Message";
import uparrow from "../../assets/icon/uparrow.png";
import { io } from "socket.io-client";
import { serverUrl } from "../../shared/api";

// 서버에 필요한 정보
// "joinRoom": 채팅창 열기
// "recMessage": 서버에서 데이터 받아오기
// "sendMessage": 서버에 요청 보내기
// address, name, auction_id, message

// 소켓연결
let socket;
const address = sessionStorage.getItem("auth_token");
const name = sessionStorage.getItem("user_nickname");
const server = `${serverUrl}/chat`;

const Chat = (props) => {
  const auction_id = props.data.auction_id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  socket = io(server);

  // 1.auction_id로 채팅창 생성
  useEffect(() => {
    socket = io(server);
    socket.emit("joinRoom", `${auction_id}`, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  // 2. data 보내기
  const sendMessage = async (e) => {
    if (message !== "") {
      const data = {
        auction_id: auction_id,
        address: address,
        name: name,
        message: message,
      };
      await socket.emit("sendMessage", data);
      setMessage("");
    }
  };

  // 3. data 받아오기
  useEffect(() => {
    socket.on("recMessage", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="AuctionChattingContainer">
      <div className="AuctionDisplayContainer">
        <ul className="ChatLists">
          {messages.map((list, i) => (
            <div key={i}>
              <Message message={list.message} name={list.name} />
            </div>
          ))}
        </ul>
      </div>
      <div className="AuctionChattingInputWrapper">
        <div className="AuctionChattingInputBackGround">
          {address ? (
            <input
              className="AuctionChattingInput"
              placeholder="메세지를 입력해주세요."
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
          ) : (
            <input
              className="AuctionChattingInput"
              placeholder="로그인이 필요합니다."
              type="text"
              disabled
            />
          )}
          <img className="UpArrowImg" src={uparrow} onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
