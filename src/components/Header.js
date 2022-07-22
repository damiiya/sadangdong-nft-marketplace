import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/icon/logo.png";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginModal from "../elements/LoginModal";
import LogoutModal from "../elements/LogoutModal";
import createitem from "../assets/icon/createitem.png";
import createcollection from "../assets/icon/createcollection.png";
import { getUserProfile } from "../redux/modules/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const token = sessionStorage.getItem("auth_token");
  const userProfile = useSelector((state) => state.user.userProfile);

  const goMain = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (userProfile && token) {
      setIsLoad(true);
    }
  }, [userProfile, isLoad]);

  if (!isLoad) {
    return null;
  }

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
            <button className="HeaderButton">
              <a href="list">All NFTs</a>
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
                  src={userProfile.profile_image}
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
