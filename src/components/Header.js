import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon/logo.png";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginModal from "../elements/LoginModal";
import LogoutModal from "../elements/LogoutModal";
import createitem from "../assets/icon/createitem.png";
import createcollection from "../assets/icon/createcollection.png";

import cart from "../assets/icon/cart.png";
import user from "../assets/icon/user.png";

const Header = (userProfile) => {
  console.log(userProfile.profile_image);

  const navigate = useNavigate();

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const token = sessionStorage.getItem("auth_token");

  const profile = sessionStorage.getItem("user_profile");

  const search = (event) => {
    if (event.key === "Enter") {
      setKeyword(event.target.value);
      navigate(`/search/${keyword}`);
    }
  };

  const iconSearch = () => {
    navigate(`/search/${keyword}`);
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
              <a href="/">
                <img className="LogoImage" src={logo} />
              </a>
            </div>
            <div className="SearchBar">
              <input
                className="SearchInput"
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={(event) => {
                  setKeyword(event.target.value);
                }}
                onKeyPress={(event) => search(event)}
              />
              <button className="SearchButton" type="submit"></button>
              <div className="SearchIconDiv" onClick={iconSearch}>
                <SearchIcon className="IconButton" />
              </div>
            </div>
          </div>
          <div className="ButtonBundle">
            <button className="HeaderButton">
              <a href="/list">All NFTs</a>
            </button>
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
                  <button className="AccordionMenuButton-1">
                    <a href="/createitem">Create Item</a>
                  </button>
                </div>
                <div className="AccordionCreateitemContainer-2">
                  <img src={createcollection} />
                  <button className="AccordionMenuButton-2">
                    <a href="/createcollection">Create Collection</a>
                  </button>
                </div>
              </div>
            </div>
            {token && userProfile ? (
              <>
                <button
                  className="HeaderDisconnectButton"
                  onClick={() => {
                    setOpenLogoutModal(true);
                  }}
                >
                  Disconnect a Wallet
                </button>

                <div className="Accordion">
                  <input type="checkbox" id="account01" />
                  <label className="HeaderLabel" htmlFor="account01">
                    <Avatar
                      className="HeaderAvatar"
                      alt="User Name"
                      src={profile}
                      sx={{ width: 56, height: 56 }}
                    />
                  </label>
                  <div className="AccordionAccountMenu">
                    <div className="AccordionCreateitemContainer-1">
                      <img src={user} />
                      <button className="AccordionMenuAccountButton-1">
                        <a href={`/account/${token}`}>내 계정</a>
                      </button>
                    </div>
                    <div className="AccordionCreateitemContainer-2">
                      <img src={cart} />
                      <button className="AccordionMenuButton-2">
                        <a href="/myauction">내 경매목록</a>
                      </button>
                    </div>
                  </div>
                </div>
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

                <div className="Accordion">
                  <input type="checkbox" id="account01" />
                  <Avatar
                    className="HiddenHeaderAvatar"
                    alt="User Name"
                    src=""
                    sx={{ width: 56, height: 56 }}
                  />
                  <div className="AccordionAccountMenu">
                    <div className="AccordionCreateitemContainer-1"></div>
                    <div className="AccordionCreateitemContainer-2"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
