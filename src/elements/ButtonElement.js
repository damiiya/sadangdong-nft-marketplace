import React from "react";
import LoginModal from "./LoginModal";

const ButtonElement = (props) => {
  const { openLoginModal, setOpenLoginModal } = props;
  return (
    <>
      <button className="ButtonStyle">Login</button>
    </>
  );
};

export default ButtonElement;
