import React, { useState, useEffect } from "react";
import { loadCollectionDetail } from "../redux/modules/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import pencil from "../assets/icon/pencil.png";
import CardAuction from "../components/Card/CardAuction";
import CardItem from "../components/Card/CardItem";

import { useParams } from "react-router-dom";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const collectionId = params.collectionId;
  const [category, setCategory] = useState(0);

  useEffect(() => {
    dispatch(loadCollectionDetail(collectionId));
  }, []);

  const collectionDetail = useSelector(
    (state) => state.collection.collectionDetail
  );
  console.log(collectionDetail);

  if (!collectionDetail) {
    return <h1>hi</h1>;
  }

  return (
    <div className="MainContainer">
      <div
        className="MainBanner"
        style={{
          backgroundImage: `url(
            ${collectionDetail && collectionDetail.banner_image}
          )`,
        }}
      >
        <div className="UserImageWrap">
          <Avatar
            alt="User Name"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHxLdpyffNGzkCT6HRbqlPMdjlT5PzWRqzw&usqp=CAU"
            sx={{ width: 152, height: 152 }}
          />
        </div>
      </div>
      <div className="CollectionInfoContainer">
        <div className="CollectionInfoWrap">
          <div className="CollectionInfo">
            <span className="InfoTap">Items</span>
            <span className="InfoValue">15</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Owners</span>
            <span className="InfoValue">10</span>
          </div>
          <div className="CollectionInfo">
            <span className="InfoTap">Floor Price</span>
            <span className="InfoValue">999.99</span>
          </div>
        </div>
      </div>
      <div className="CollectionTitleWrapper">
        <div className="CollectionTitleWrap">
          <span className="CollectionTitleLetter">
            {collectionDetail && collectionDetail.name}
          </span>
          <span className="CollectionUerLetter">by User name</span>
        </div>
        <div className="CollectionButtonBundle">
          <button className="CollectionTitleButton">
            <img className="ButtonIcon" src={share} />
            share
          </button>
          <button className="CollectionTitleButton">
            <img className="ButtonIcon" src={pencil} />
            <a href={`/editcollection/${collectionId}`}>Collection Edit</a>
          </button>
        </div>
      </div>
      <div className="CollectionDescriptionWrapper">
        {collectionDetail && collectionDetail.description}
      </div>
      <div className="CategoryContainer">
        <div className="CategoryWrapper">
          <button
            className="SelectedSmallButton"
            onClick={() => {
              setCategory(0);
            }}
          >
            경매 진행중인 아이템
          </button>
          <button
            className="UnSelectedSmallButton"
            onClick={() => {
              setCategory(1);
            }}
          >
            아이템
          </button>
        </div>
        <div className="CardWrapper">
          {category === 0 && <CardAuction />}
          {category === 1 && <CardItem />}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
