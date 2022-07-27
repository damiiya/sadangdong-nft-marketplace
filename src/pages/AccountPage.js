import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadAccountCollection } from "../redux/modules/userSlice";
import { Avatar } from "@mui/material";
import share from "../assets/icon/share.png";
import pencil from "../assets/icon/pencil.png";
import CardAuction from "../components/card/CardAuction";
import CardCollection from "../components/card/CardCollection";
import CardItem from "../components/card/CardItem";
import cart2 from "../assets/icon/cart2.png";

const AccountPage = () => {
  const [category, setCategory] = useState(0);
  const token = sessionStorage.getItem("auth_token");
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;
  const userCollectionData = useSelector((state) => state.user.collection);

  useEffect(() => {
    dispatch(loadAccountCollection(token_id));
  }, []);

  if (!userCollectionData) {
    return null;
  }

  return (
    <div className="MainContainer">
      <div className="AuthorBanner">
        <div className="AuthorImageWrap">
          <div className="AuthorImage">
            <Avatar
              alt="User Name"
              src={userCollectionData[0].profile_image}
              sx={{ width: 152, height: 152 }}
            />
          </div>
          <div className="NameWrap">
            <span className="AuthorName">
              @{userCollectionData[0].user_name}
            </span>
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
                경매 진행중인 아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(0);
                }}
              >
                경매 진행중인 아이템
              </button>
            )}
            {category === 1 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                아이템
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(1);
                }}
              >
                아이템
              </button>
            )}
            {category === 2 ? (
              <button
                className="SelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                컬렉션
              </button>
            ) : (
              <button
                className="UnSelectedSmallButton"
                onClick={() => {
                  setCategory(2);
                }}
              >
                컬렉션
              </button>
            )}
          </div>
          <div className="ShareCartWrap">
            <div className="ShareWrap">
              <button className="CollectionTitleButton">
                <img className="ButtonIcon" src={share} />
                share
              </button>
            </div>
            <a href="/account/myauction">
              <div className="CartCircle">
                <img className="CartImg" src={cart2} />
              </div>
            </a>
          </div>
        </div>
        <div className="CardWrapper">
          {/* {category === 0 && <CardAuction />} */}
          {/* {category === 1 && <CardItem />} */}
          {category === 2 && <CardCollection data={userCollectionData} />}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
