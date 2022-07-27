import React from "react";
import { Avatar } from "@mui/material";

const CardCollection = (props) => {
  return (
    <>
      {props.data.map((val, index) => (
        <a href={`/detail/collection/${val.name}`}>
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

              <span className="CardName">{val.name}</span>

              <span className="CardUserName">{val.user_name}</span>
              <span className="CardCollectionDescription">
                {val.description}
              </span>
            </div>
          </div>
        </a>
      ))}
    </>
  );
};

export default CardCollection;
