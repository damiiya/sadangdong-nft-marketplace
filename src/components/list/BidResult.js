// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []리스트 내 컨텐츠들의 길이에 따라 위치가 변하는 것 고정시켜야함
// []거래완료시 버튼 색이 달라지게 해야함

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { buyNft } from "../../redux/modules/itemSlice";
import { ethers } from "ethers";
import { MINT_NFT_ABI } from "../../contracts/mintabi";
import { MintContractAddress } from "../../shared/api";

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
  const getTransaction = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log("현재 계정:", account);

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

  return bidWin ? (
    <div className="activity-table2">
      <div className="table1-row">
        <img className="act-img" src={props.image} />
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
        <img className="act-img" src={props.image} />
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
