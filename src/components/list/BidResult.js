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
    <div className="MyAuctionPageContentWrapper">
      <div className="MyAuctionPageContentImageWrapper">
        <img className="MyBiddingImage" src={props.image} />
      </div>
      <span className="ContentItemName">{props.name}</span>
      <span className="ContentAuctionStart">{props.started_at}</span>
      <span className="ContentAuctionEnd">{props.ended_at}</span>
      <span className="ContentWinningBid">{props.bidding_price}</span>
      <span className="ContentMyBidding">{props.user_offer}</span>
      {props.transaction == 0 ? (
        <button className="ContentMyBidSuccessResult2">{props.message}</button>
      ) : (
        <button className="ContentMyBidSuccessResult1" onClick={getTransaction}>
          {props.message}
        </button>
      )}
    </div>
  ) : (
    <div className="MyAuctionPageContentWrapper">
      <div className="MyAuctionPageContentImageWrapper">
        <img src={props.image} />
      </div>
      <span className="ContentItemName">{props.name}</span>
      <span className="ContentAuctionStart">{props.started_at}</span>
      <span className="ContentAuctionEnd">{props.ended_at}</span>
      <span className="ContentWinningBid">{props.bidding_price}</span>
      <span className="ContentMyBidding">{props.user_offer}</span>
      <div className="ContentMyBidFailureResult">{props.message}</div>
    </div>
  );
};

export default BidResult;
