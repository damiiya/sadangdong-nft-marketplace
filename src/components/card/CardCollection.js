import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const CardCollection = (props) => {
  return (
    <>
      {props.data.map((val, index) => (
        <div key={index} className="CardCollectionContainer">
          <div className="CardCollectionImageWrapper">
            <Link to={`/detail/collection/${val.name}`}>
              <img className="CardCollectionImage" src={val.feature_image} />
            </Link>
          </div>
          <div className="CardCollectionContentWrapper">
            <Avatar
              alt="username"
              src={val.profile_image}
              sx={{ width: 64, height: 64 }}
              style={{
                border: "solid 5px #fff",
                backgroundColor: "#fff",
              }}
            />
            <span className="CardName">{val.name}</span>
            <Link to={`/account/${val.address}`}>
              <span className="CardUserName">by {val.user_name}</span>
            </Link>
            <span className="CardCollectionDescription">{val.description}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardCollection;
