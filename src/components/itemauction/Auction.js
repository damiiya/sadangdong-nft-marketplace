import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { io } from "socket.io-client";
import { serverUrl } from "../../shared/api";
import Chat from "./Chat";
import { Offer, PreOffer } from "./Offer";
import { serverUrl_sol } from "../../shared/api";
import axios from "axios";

// 서버에 필요한 정보
// "joinRoom": 채팅창 열기
// "sendOffer": 서버에 요청 보내기
// "recOffer": 서버에서 데이터 받아오기
// "error": 에러 처리하기

// 경매용 소켓연결
let socket;
const address = sessionStorage.getItem("auth_token");
const name = sessionStorage.getItem("user_nickname");
const server = `${serverUrl}/offer`;

const Auction = (props) => {
  const auction_id = props.itemDetail.auction_id;
  const [price, setPrice] = useState("");
  const [offers, setOffers] = useState([]);

  socket = io(server);

  // 1.auction_id로 채팅창 생성
  useEffect(() => {
    // 소켓연결내용
    // socket = io(server);
    socket.emit("joinRoom", `${auction_id}`, (error) => {
      console.log("error");
      if (error) {
        alert(error);
      }
    });
    // 리턴안에 먼저 실행하고
    return () => {
      socket.on("leaveRoom", () => {
        console.log("disconnect");
      });
    };
  }, []);

  // 2. data 보내기
  const sendServer = async (account, price) => {
    try {
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // const account = accounts[0];
      // console.log("현재 계정:", account);
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
          name: name,
        };
        axios
          .post(`${serverUrl}/api/offer/${auction_id}`, data, {
            headers: { authorization: address },
          })
          .then(async (response) => {
            if (response.data.statusCode === 400) {
              return alert(response.data.statusMsg);
            }
            const hello = await socket.emit("sendOffer", data);
            console.log(hello);
            setPrice("");
            console.log(response);
            console.log(response.data);
            alert(response.data.statusMsg);
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendOffer = async (e) => {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        const SDDchainId = 1387;
        const SDD = `0x${SDDchainId.toString(16)}`;
        console.log(chainId);
        console.log(SDD);

        if (chainId === SDD) {
          console.log("네트워크 연결이 가능합니다!");
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          console.log(accounts);
          sendServer(account, price);
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: SDD }],
            });
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            console.log(accounts);
            sendServer(account, price);
          } catch (switchError) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: SDD,
                    chainName: "Sadangdong",
                    rpcUrls: [`${serverUrl_sol}`],
                  },
                ],
              });
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: SDD }],
              });
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              const account = accounts[0];
              console.log(accounts);
              sendServer(account, price);
            } catch (addError) {
              console.log("연결이 실패했습니다.");
            }
          }
          console.log("연결이 실패했습니다.");
        }
      } else {
        alert("메타마스크를 먼저 설치해주세요!");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. data 받아오기
  useEffect(() => {
    socket.on("recOffer", (data) => {
      console.log(data);
      setOffers((list) => [...list, data]);
    });
  }, [socket]);

  // 4. 에러 처리하기
  useEffect(() => {
    socket.on("error", (error) => {
      alert(error);
    });
  }, []);

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
                  </div>
                  {offers.length > 0 ? (
                    <div className="AuctionHighestPrice">
                      {offers[offers.length - 1].price}ETH
                    </div>
                  ) : (
                    <div className="AuctionHighestPrice">
                      {props.itemDetail.bidding_price}ETH
                    </div>
                  )}
                </div>
                <div className="AuctionStartingPriceWrapper">
                  <div className="AuctionStartingPriceSpan">시작가</div>
                  <div className="AuctionStartingPrice">
                    {props.itemDetail.auction_price} ETH
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
                <div className="AuctionContainer">
                  {props.biddingList.length > 0 &&
                    props.biddingList.map((list, i) => (
                      <div key={i}>
                        <PreOffer
                          created_at={list.created_at}
                          name={list.name}
                          price={list.price}
                        />
                      </div>
                    ))}
                  {offers.map((list, i) => (
                    <div key={i}>
                      <Offer
                        created_at={list.created_at}
                        name={list.name}
                        price={list.price}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
