import React from "react";

const SellingItemPage = () => {
  return (
    <>
      <div className="ItemContainer">
        <div className="ItemWrapper">
          <div className="ItemImageDiv">
            <img
              className="ItemImage"
              src="https://www.cosmorning.com/data/photos/20210153/art_16095743571912_f2a3fc.jpg"
            />
          </div>
          <div className="ItemInfoContainer">
            <div className="ItemAuctionRegisterTittle">
              <span className="ItemAuctionRegisterSpan">아이템 경매 등록</span>
            </div>
            <div className="ItemNameWrapper">
              <span className="SellItemTittle">Item</span>
              <span className="SellItemName">Item Name</span>
            </div>
            <div className="SellDescriptionWrapper">
              <div className="SellDescriptionTittle">DESCRIPTION</div>
              <div className="SellDescriptionContent">
                <p>Magnum 75 #11 by Bruno Barbey. Paris, France. 1966</p>
                <p>Danish actor Anna Karina</p>
                <p>
                  The Magnum 75 collection is the inaugural NFT collection by
                  Magnum
                </p>
                <p>
                  Photos. Created in 2022, the collection brings together works
                  by76
                </p>
                <p>photographers taken across seven decades.</p>
              </div>
            </div>
            <div className="SellCollectionWrapper">
              <span className="SellCollectionTittle">Collection</span>
              <span className="SellCollectionName">Collection name</span>
            </div>
            <div className="SellDescriptionWrapper">
              <div className="SellDescriptionTittle">DESCRIPTION</div>
              <div className="SellDescriptionContent">
                <p>Magnum 75 #11 by Bruno Barbey. Paris, France. 1966</p>
                <p>Danish actor Anna Karina</p>
                <p>
                  The Magnum 75 collection is the inaugural NFT collection by
                  Magnum
                </p>
                <p>
                  Photos. Created in 2022, the collection brings together works
                  by76
                </p>
                <p>photographers taken across seven decades.</p>
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
                <li className="SellAuctionNotification-2">
                  confirm. 경매 등록 시 수정이 불가능 합니다.
                </li>
              </ul>
            </div>
            <div className="ItemAuctionRegisterWrapper">
              <input className="ItemAuctionPriceInput" placeholder="0.00" />
              <span className="ItemAuctionPriceInputEth">ETH</span>
              <button className="ItemAuctionRegisterButton">경매등록</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellingItemPage;
