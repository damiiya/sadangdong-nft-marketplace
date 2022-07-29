import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { io } from "socket.io-client";
import { serverUrl } from "../../shared/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import Chat from "./Chat";
import Offer from "./Offer";

// 서버에 필요한 정보
// "joinRoom": 채팅창 열기
// "recOffer": 서버에서 데이터 받아오기
// "sendOffer": 서버에 요청 보내기
// address, price, mycoin, auction_id
// time, name, price, bidding

// 경매용 소켓연결
let socket;
const address = sessionStorage.getItem("auth_token");
const server = `${serverUrl}/offer`;

const Auction = (props) => {
  console.log(props.data);
  const auction_id = props.data.auction_id;
  const [price, setPrice] = useState("");
  const [offers, setOffers] = useState([]);

  // 1.auction_id로 채팅창 생성
  useEffect(() => {
    socket = io(server);
    socket.emit("joinRoom", `${auction_id}`, (error) => {
      console.log("error");
      if (error) {
        alert(error);
      }
    });
  }, []);

  // 3. data 받아오기
  useEffect(() => {
    console.log(3);
    socket.on("recOffer", (data) => {
      console.log(data);
      setOffers((list) => [...list, data]);
    });
  }, [socket]);

  // 2. data 보내기
  const sendOffer = async (e) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log("현재 계정:", account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      const mycoin = ethers.utils.formatEther(balance);
      console.log(mycoin);

      if (price && address) {
        const data = {
          auction_id: auction_id,
          address: address,
          price: price,
          mycoin: mycoin,
        };
        await socket.emit("sendOffer", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="AuctionBottomContainer">
        <div className="AuctionBottomAllContainer">
          <div className="AuctionBottomLeftWrapper" />
          <div className="AuctionBottomRightWrapper">
            <div className="AuctionBottomRightContent">
              <div className="AuctionPriceContent">
                <div className="AuctionHighestPriceWrapper">
                  <div className="AuctionHighestPriceSpanIcon">
                    <span className="AuctionHighestPriceSpan">현재 최고가</span>
                    <RefreshIcon className="AuctionHighestPriceRefreshIcon" />
                  </div>
                  <div className="AuctionHighestPrice">999.99 ETH</div>
                </div>
                <div className="AuctionStartingPriceWrapper">
                  <div className="AuctionStartingPriceSpan">시작가</div>
                  <div className="AuctionStartingPrice">
                    {props.data.auction_price} ETH
                  </div>
                </div>
              </div>
              <div className="AuctionOfferPrice">가격제시</div>
              <div className="AuctionBidWrapper">
                <input
                  className="ItemAuctionPriceInput"
                  placeholder="0.00"
                  type="number"
                  max="100"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <span className="AuctionBidInputEth">ETH</span>
                <button className="AuctionBidButton" onClick={sendOffer}>
                  입찰
                </button>
              </div>
              <section className="AuctionChattingPriceListTittle">
                <span className="AuctionChattingTittle">채팅창</span>
                <span className="AuctionPriceListTittle">
                  제시된 가격 리스트
                </span>
              </section>
              <div className="AuctionChattingPriceListContainer">
                <Chat data={props} />
                <Offer data={props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
