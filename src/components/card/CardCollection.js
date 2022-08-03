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
            <Link to={`/account/${val.address}`}>
              <Avatar
                className="CardCollectionAvatar"
                alt="username"
                src={val.profile_image}
                sx={{ width: 64, height: 64 }}
                style={{
                  border: "solid 5px #fff",
                  backgroundColor: "#fff",
                }}
              />
            </Link>
            <Link to={`/account/${val.address}`}>
              <span className="CardName HoverColor">{val.name}</span>
            </Link>
            <Link to={`/account/${val.address}`}>
              <span className="CardUserName HoverColor">
                by {val.user_name}
              </span>
            </Link>
            {val.description.length > 30 ? (
              <span className="CardCollectionDescription">
                {val.description.substr(0, 30)}....
              </span>
            ) : (
              <span className="CardCollectionDescription">
                {val.description}
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CardCollection;
