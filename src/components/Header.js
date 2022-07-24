import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon/logo.png";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginModal from "../elements/LoginModal";
import LogoutModal from "../elements/LogoutModal";
import createitem from "../assets/icon/createitem.png";
import createcollection from "../assets/icon/createcollection.png";

const Header = () => {
  const navigate = useNavigate();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const token = sessionStorage.getItem("auth_token");

  const goMain = () => {
    navigate("/");
  };

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
                    <a href="createitem">Create Item</a>
                  </button>
                </div>
                <div className="AccordionCreateitemContainer-2">
                  <img src={createcollection} />
                  <button className="AccordionMenuButton-2">
                    <a href="createcollection">Create Collection</a>
                  </button>
                </div>
              </div>
            </div>
            {token ? (
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
