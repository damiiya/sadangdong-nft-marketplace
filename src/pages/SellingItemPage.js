// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []경매가격 설정에 상한선과 하한선에 조건을 줘야함!

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { applyAuction, loadItemDetail } from "../redux/modules/itemSlice";
import { ethers } from "ethers";
import { MINT_NFT_ABI } from "../contracts/mintabi";
import { MintContractAddress } from "../shared/api";
import { serverUrl } from "../shared/api";
import axios from "axios";

const SellingItemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const token_id = params.token_id;
  const token = sessionStorage.getItem("auth_token");
  const [isLoad, setIsLoad] = useState(false);
  const [price, setPrice] = useState(0);
  const itemDetail = useSelector((state) => state.item.itemDetail);

  const handleSubmit = async () => {
    window.confirm("경매 등록시 수정이 불가능합니다!");
    try {
      if (itemDetail.transaction) {
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

        const tokenID = ethers.utils.hexlify(Number(token_id));
        const ethPrice = ethers.utils.parseEther(price);
        const response = await axios.get(
          `${serverUrl}/api/json/transaction/${itemDetail.hashdata}`
        );
        if (response.data.statusCode === 400) {
          return alert(response.data.statusMsg);
        }
        const auction = await contract.setSaleNftToken(tokenID, ethPrice);
        console.log(auction);
      }

      dispatch(applyAuction({ token_id: token_id, price: price }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(loadItemDetail(token_id));
  }, []);

  useEffect(() => {
    if (itemDetail) {
      setIsLoad(true);
    }
  });

  // Creator Earnings 유효성 검사
  // 숫자만 가능
  const checkNumber = (e) => {
    const regExpNum = /^[0-9]*(\.?\d*)$/;
    if (!regExpNum.test(e.currentTarget.value)) {
      alert("숫자만 입력해주세요");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  if (!isLoad) {
    return null;
  }

  const now_date = new Date();
  now_date.setHours(now_date.getHours() + 9);
  if (itemDetail.transaction_at > now_date.toISOString()) {
    alert("경매처리가 진행중입니다!");
    navigate("/");
  }

  if (!itemDetail.owner && token) {
    alert("잘못된 접근입니다!");
    navigate("/");
  }

  return (
    <>
      <div className="ItemContainer">
        <div className="ItemWrapper">
          <div className="ItemImageDiv">
            <img className="ItemImage" src={itemDetail.image} />
          </div>
          <div className="ItemInfoContainer">
            <div className="ItemAuctionRegisterTittle">
              <span className="ItemAuctionRegisterSpan">아이템 경매 등록</span>
            </div>
            <div className="ItemNameWrapper">
              <span className="SellItemTittle">Item</span>
              <span className="SellItemName">{itemDetail.name}</span>
            </div>
            <div className="SellDescriptionWrapper">
              <div className="SellDescriptionTittle">DESCRIPTION</div>
              <div className="SellDescriptionContent">
                <p>{itemDetail.description}</p>
              </div>
            </div>
            <div className="SellCollectionWrapper">
              <span className="SellCollectionTittle">Collection</span>
              <span className="SellCollectionName">
                {itemDetail.collection_name}
              </span>
            </div>
            <div className="SellDescriptionWrapper">
              <div className="SellDescriptionTittle">DESCRIPTION</div>
              <div className="SellDescriptionContent">
                <p>{itemDetail.collection_description}</p>
              </div>
            </div>
            <div className="SellPriceWrapper">
              <span className="SellPriceTittle">Price</span>
              <span className="SellPriceSpan">
                경매등록을 위한 최소 가격을 설정해주세요.
              </span>
            </div>
            <div className="SellAuctionNotification">
              <ul>
                <li className="SellAuctionNotification-1">
                  경매 등록 시 수정이 불가능 합니다.
                </li>
              </ul>
            </div>
            <div className="ItemAuctionRegisterWrapper">
              <input
                className="ItemAuctionPriceInput"
                placeholder="0.00"
                type="text"
                value={price}
                onChange={(e) => {
                  checkNumber(e);
                  setPrice(e.target.value);
                }}
              />
              <span className="ItemAuctionPriceInputEth">ETH</span>
              <button
                className="ItemAuctionRegisterButton"
                onClick={handleSubmit}
              >
                경매등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellingItemPage;
