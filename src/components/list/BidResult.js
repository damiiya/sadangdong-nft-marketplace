// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []리스트 내 컨텐츠들의 길이에 따라 위치가 변하는 것 고정시켜야함
// []거래완료시 버튼 색이 달라지게 해야함

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { buyNft } from "../../redux/modules/itemSlice";
import { ethers } from "ethers";
import { MINT_NFT_ABI } from "../../contracts/mintabi";
import { MintContractAddress } from "../../shared/api";
import { serverUrl_sol } from "../../shared/api";
import { Link } from "react-router-dom";

const BidResult = (props) => {
  const dispatch = useDispatch();
  const [bidWin, setBidWin] = useState(false);

  useEffect(() => {
    if (props.bidding_price === props.user_offer) {
      setBidWin(true);
    }
  });

  // 거래완료사항 요청하기
  const handleSubmit = () => {
    dispatch(buyNft({ price: props.user_offer, auction_id: props.id }));
  };

  // 메타마스크로 거래완료하기
  const sendTransaction = async (account) => {
    try {
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      // const account = accounts[0];
      // console.log("현재 계정:", account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MintContractAddress,
        MINT_NFT_ABI,
        signer
      );
      const getToken = await contract.getSaleNftToken();
      console.log(getToken);

      const AA = await contract.getNftTokens(account);
      console.log(AA);

      const tokenID = ethers.utils.hexlify(Number(props.token_id));
      const ethPrice = ethers.utils.parseEther(props.user_offer);
      const auction = await contract.buyNftToken(tokenID, { value: ethPrice });
      console.log(auction);

      handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async () => {
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
          sendTransaction(account);
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
            sendTransaction(account);
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
              sendTransaction(account);
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

  return bidWin ? (
    <div className="activity-table2">
      <div className="table1-row">
        <Link to={`/detail/item/${props.token_id}`}>
          <img className="act-img" src={props.image} />
        </Link>
      </div>
      <span id="row-title1" className="table1-row">
        {props.name}
      </span>
      <span id="row-title2" className="table1-row">
        {props.started_at}
      </span>
      <span id="row-title2" className="table1-row">
        {props.ended_at}
      </span>
      <span id="row-title3" className="table1-row">
        {props.bidding_price}
      </span>
      <span id="row-title3" className="table1-row">
        {props.user_offer}
      </span>
      {props.transaction == 0 ? (
        <div id="row-title4" className="table1-row">
          <button id="btnA-2" className="activity-btn">
            {props.message}
          </button>
        </div>
      ) : (
        <div id="row-title4" className="table1-row">
          <button id="btnA-1" className="activity-btn" onClick={getTransaction}>
            {props.message}
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="activity-table2">
      <div className="table1-row">
        <Link to={`/detail/item/${props.token_id}`}>
          <img className="act-img" src={props.image} />
        </Link>
      </div>
      <span id="row-title1" className="table1-row">
        {props.name}
      </span>
      <span id="row-title2" className="table1-row">
        {props.started_at}
      </span>
      <span id="row-title2" className="table1-row">
        {props.ended_at}
      </span>
      <span id="row-title3" className="table1-row">
        {props.bidding_price}
      </span>
      <span id="row-title3" className="table1-row">
        {props.user_offer}
      </span>
      <div id="row-title4" className="table1-row">
        <div id="btnA-3" className="activity-btn">
          {props.message}
        </div>
      </div>
    </div>
  );
};

export default BidResult;
