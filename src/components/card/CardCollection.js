import React from "react";
import { Avatar } from "@mui/material";

const CardCollection = (props) => {
  return (
    <>
      {props.data.map((val, index) => (
        <div key={index} className="CardCollectionContainer">
          <div className="CardCollectionImageWrapper">
            <img className="CardCollectionImage" src={val.feature_image} />
          </div>
          <div className="CardCollectionContentWrapper">
            <Avatar
              alt="username"
              src={val.profile_image}
              sx={{ width: 64, height: 64 }}
              style={{
                border: "solid 1px #e5e5e5",
              }}
            />
            <a
              className="CardItemNameRouting"
              href={`/detail/collection/${val.name}`}
            >
              <span className="CardName">{val.name}</span>
            </a>
            <a href={`/account/${val.address}`}>
              <span className="CardUserName">by {val.user_name}</span>
            </a>
            <span className="CardCollectionDescription">{val.description}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardCollection;
