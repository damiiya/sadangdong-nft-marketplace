import React, { useState } from "react";
import { Avatar } from "@mui/material";
import pencil from "../assets/icon/pencil.png";
import CardItem from "../components/card/CardItem";

function MyActivityPage() {
  const [category, setCategory] = useState(0);
  const [selected, setSelected] = useState("0");
  const token = sessionStorage.getItem("auth_token");
  console.log("category :", category, "selected :", selected);

  return (
    <div className="MainContainer">
      <div className="AuthorBanner">
        <div className="AuthorImageWrap">
          <div className="AuthorImage">
            <Avatar
              alt="User Name"
              //   src={userCollectionData[0].profile_image}
              sx={{ width: 152, height: 152 }}
            />
          </div>
          <div className="NameWrap">
            <span className="AuthorName">@ userName</span>

            <a href={`/account/edit/${token}`}>
              <img className="Icon" src={pencil} />
            </a>
          </div>
        </div>
      </div>
      <div className="CategoryContainer">
        <div className="SmallCategoryWrapper">
          <div className="CategoryWrap">
            {category === 0 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                내가 참여한 경매목록
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                내가 참여한 경매목록
              </button>
            )}
            {category === 1 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                내가 구입한 아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                내가 구입한 아이템
              </button>
            )}
            {category === 2 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                찜한 아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                찜한 아이템
              </button>
            )}
          </div>
          <div className="ShareCartWrap">
            <div className="ShareWrap">
              <input
                style={{ visibility: "hidden" }}
                type="text"
                // ref={copyLinkRef}
                // value={`http:localhost3000/account/${walletAddress}`}
              ></input>
              {/* <button className="CollectionTitleButton" onClick={copyTextUrl}>
                <img className="ButtonIcon" src={share} />
                share
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {category === 0 && (
        <div className="AuctionSelectBoxWrapper">
          <select
            className="AuctionSelectBox"
            onChange={(event) => setSelected(event.target.value)}
          >
            <option value={0}>경매 진행 목록</option>
            <option value={1}>경매 완료 목록</option>
          </select>
        </div>
      )}

      {category === 0 && selected === "0" && (
        <div className="MyAuctionPageContentContainer">
          <div className="MyAuctionPageContentTitleWrapper">
            <span className="ContentTitleImage">이미지</span>
            <span className="ContentTitleItem">아이템명</span>
            <span className="ContentTitleAuctionStart">경매 시작 시간</span>
            <span className="ContentTitleAuctionEnd">경매 종료 시간</span>

            <span className="ContentTitleAuctionHighestBid">
              현재 최고 입찰가
            </span>
            <span className="ContentTitleAuctionMyBid">입찰가격</span>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentHighestBid">99.999</span>
            <div className="ContentMyBid">99.999</div>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentHighestBid">99.999</span>
            <div className="ContentMyBid">99.999</div>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentHighestBid">99.999</span>
            <div className="ContentMyBid">99.999</div>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentHighestBid">99.999</span>
            <div className="ContentMyBid">99.999</div>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentHighestBid">99.999</span>
            <div className="ContentMyBid">99.999</div>
          </div>
        </div>
      )}

      {category === 0 && selected === "1" && (
        <div className="MyAuctionPageContentContainer">
          <div className="MyAuctionPageContentTitleWrapper">
            <span className="ContentTitleImage">이미지</span>
            <span className="ContentTitleItem">아이템명</span>
            <span className="ContentTitleAuctionStart">경매 시작 시간</span>
            <span className="ContentTitleAuctionEnd">경매 종료 시간</span>

            <span className="ContentTitleAuctionWinningBid">최종 낙찰가</span>
            <span className="ContentTitleAuctionMyFinalBid">입찰가</span>
            <span className="ContentTitleAuctionMyBidResult">입찰결과</span>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentWinningBid">99.999</span>
            <span className="ContentMyBidding">99.999</span>
            <div className="ContentMyBidSuccessResult">
              경매에 성공하셨습니다!
            </div>
          </div>
          <div className="MyAuctionPageContentWrapper">
            <div className="MyAuctionPageContentImageWrapper">
              <img />
            </div>
            <span className="ContentItemName">Item name#1</span>
            <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
            <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
            <span className="ContentWinningBid">99.999</span>
            <span className="ContentMyBidding">99.999</span>
            <div className="ContentMyBidFailureResult">
              아쉽지만 유찰되었습니다.
            </div>
          </div>
        </div>
      )}
      {category === 1 && (
        <div className="CardWrapper">{/* <CardItem data={itemData} /> */}</div>
      )}

      {category === 2 && (
        <div className="CardWrapper">{/* <CardItem data={itemData} /> */}</div>
      )}
    </div>
  );
}

export default MyActivityPage;
