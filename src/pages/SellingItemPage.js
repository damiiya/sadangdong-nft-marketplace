import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { applyAuction, loadItemDetail } from "../redux/modules/itemSlice";
import { ethers } from "ethers";
import { MINT_NFT_ABI } from "../contracts/mintabi";
import { MintContractAddress } from "../shared/api";

const SellingItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;
  const [isLoad, setIsLoad] = useState(false);
  const [price, setPrice] = useState(0);
  const itemDetail = useSelector((state) => state.item.itemDetail);

  const handleSubmit = async () => {
    window.confirm("경매 등록시 수정이 불가능합니다!");
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
      const tokenID = `0x${token_id.toString(16)}`;
      const ethPrice = ethers.utils.parseEther(price);
      const result = await contract.setApprovalForAll(
        MintContractAddress,
        true
      );
      console.log(result);

      const auction = await contract.setSaleNftToken(tokenID, ethPrice);
      console.log(auction);

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

  if (!isLoad) {
    return null;
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
                type="number"
                max="100"
                min="0"
                step="any"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
