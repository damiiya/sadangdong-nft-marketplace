import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { contractAbi, contractAddress } from "../shared/abi";
import metamaskfox from "../assets/icon/metamaskfox.png";
import Modal from "react-modal";
import { createAccount } from "../redux/modules/userSlice";
import { contractAddress, serverUrl_sol } from "../shared/api";

import { CONTRACT_ABI } from "../contracts/abi";
import { MintContractAddress } from "../shared/api";
import { MINT_NFT_ABI } from "../contracts/mintabi";

const LoginModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openLoginModal, setOpenLoginModal } = props;
  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log(accounts);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);

        // const contract = new ethers.Contract(
        //   MintContractAddress,
        //   MINT_NFT_ABI,
        //   signer
        // );

        // const tokensOwned = await contract.balanceOf(account);
        // console.log(tokensOwned);

        // const bal = await provider.getBalance("ethers.eth");
        // console.log(bal);
      } else {
        alert("Install Metamask!");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadHome = () => {
    setOpenLoginModal(false);
    dispatch(createAccount(account));
  };

  return (
    <>
      <Modal
        className="LoginModal"
        overlayClassName="LoginOverLay"
        isOpen={openLoginModal}
        // onRequestClose={() => setOpenLoginModal(false)}
      >
        {account ? (
          <>
            <div className="LoginModalQuestionContainer">
              <span className="LoginModalQuestion">지갑이 연결되었습니다!</span>
            </div>

            <>
              <div className="LoginModalButtonContainer">
                <button className="LoginModalButton" onClick={loadHome}>
                  <div className="LoginModalButtonWrapper">
                    <img className="LoginMetaMaskImg" src={metamaskfox} />
                    <span className="ConnetWalletSpan">
                      동물들을 보러갈까요?
                    </span>
                  </div>
                </button>
              </div>
            </>
          </>
        ) : (
          <>
            <div className="LoginModalQuestionContainer">
              <span className="LoginModalQuestion">
                메타마스크 지갑을 연결하시겠습니까?
              </span>
            </div>
            <div className="LoginModalButtonContainer">
              <button className="LoginModalButton" onClick={handleConnect}>
                <div className="LoginModalButtonWrapper">
                  <img className="LoginMetaMaskImg" src={metamaskfox} />
                  <span className="ConnetWalletSpan">
                    메타마스크 지갑 연결하기
                  </span>
                </div>
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
export default LoginModal;
