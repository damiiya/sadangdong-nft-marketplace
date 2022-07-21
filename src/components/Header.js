import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon/logo.png";
import { Avatar, Checkbox } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ButtonElement from "../elements/ButtonElement";
import LoginModal from "../elements/LoginModal";
import LogoutModal from "../elements/LogoutModal";
import createitem from "../assets/icon/createitem.png";
import createcollection from "../assets/icon/createcollection.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const checkWalletId = localStorage.getItem("auth_token");

  const goMain = () => {
    navigate("/main");
  };

  const goItem = () => {
    navigate("/createItem");
  };

  return (
    <>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
      <LogoutModal
        openLogoutModal={openLogoutModal}
        setOpenLogoutModal={setOpenLogoutModal}
      />
      <div className="HeaderContainer">
        <div className="HeaderWrapper">
          <div className="HeaderLogSearchBarContainer">
            <div className="Logo">
              <img className="LogoImage" src={logo} onClick={goMain} />
            </div>
            <div className="SearchBar">
              <form className="SearchForm">
                <input
                  className="SearchInput"
                  type="text"
                  placeholder="검색어를 입력하세요"
                />
                <button className="SearchButton" type="submit"></button>
                <SearchIcon className="IconButton" />
              </form>
            </div>
          </div>

          <div className="ButtonBundle">
            <button className="HeaderButton">All NFTs</button>
            <div className="Accordion">
              <input type="checkbox" id="answer01" />
              <label className="HeaderLabel" htmlFor="answer01">
                <span className="HeaderButton">
                  Create
                  <em></em>
                </span>
              </label>
              <div className="AccordionMenu">
                <div className="AccordionCreateitemContainer-1">
                  <img src={createitem} />
                  <button className="AccordionMenuButton-1" onClick={goItem}>
                    Create Item
                  </button>
                </div>
                <div className="AccordionCreateitemContainer-2">
                  <img src={createcollection} />
                  <button className="AccordionMenuButton-2">
                    Create Collection
                  </button>
                </div>
              </div>
            </div>
            {checkWalletId ? (
              <>
                <button
                  className="HeaderDisconnectButton"
                  onClick={() => {
                    setOpenLogoutModal(true);
                  }}
                >
                  Disconnect a Wallet
                </button>
                <Avatar
                  className="HeaderAvatar"
                  alt="User Name"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHxLdpyffNGzkCT6HRbqlPMdjlT5PzWRqzw&usqp=CAU"
                  sx={{ width: 56, height: 56 }}
                />
              </>
            ) : (
              <>
                <button
                  className="HeaderDisconnectButton"
                  onClick={() => {
                    setOpenLoginModal(true);
                  }}
                >
                  Connect a Wallet
                </button>
                <Avatar
                  className="HiddenHeaderAvatar"
                  alt="User Name"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSHxLdpyffNGzkCT6HRbqlPMdjlT5PzWRqzw&usqp=CAU"
                  sx={{ width: 56, height: 56 }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
