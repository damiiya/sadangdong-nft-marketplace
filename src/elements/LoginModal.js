import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import metamaskfox from "../assets/icon/metamaskfox.png";
import { contractAbi } from "../abi";
// import { useWeb3React } from "@web3-react/core";
// import { injected } from "../lib/connectors";

import web3 from "../web3";

export const contractAddress = "0xaaf37364Ad32066262e39B5888006E8d378811c5";

const LoginModal = (props) => {
  const navigate = useNavigate();

  const { openLoginModal, setOpenLoginModal } = props;

  // web3.eth.getAccounts().then(console.log);
  // web3.eth
  //   .getBalance()
  //   .then(console.log);

  const [account, setAccount] = useState("");

  const handleConnect = async () => {
    try {
      // try 문 안의 코드가 쭉 실행되고 에러가 없다면 catch는 건너뛴다
      if (window.ethereum) {
        // if 👉 메타마스크가 설치되어있으면 실행된다
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        }); // 연결된 메타마스크의 주소가 나온다
        // 👉 window.ethereum.request 을 console.log에 찍어보면 확인할수 있다

        setAccount(accounts[0]);
        console.log(accounts);

        web3.eth.getBalance(accounts[0]).then(console.log);
        // 연결된 메타마스크의 주소를 useState에 담는다

        // const networkId = await web3.eth.net.getId();
        // console.log(networkId);

        // const contract = new web3.eth.Contract(contractAbi, contractAddress);
        // console.log(contract);
        // console.log(contractAbi);

        // const hashname = await contract.methods.getMessageHash("hello").call();
        // console.log(hashname);

        // hash message
        // const hashedMessage = web3.utils.sha3("message");
        // console.log({ hashedMessage });

        // // sign hashed message
        // const signature = await ethereum.request({
        //   method: "personal_sign",
        //   params: [hashedMessage, accounts[0]],
        // });
        // console.log({ signature });

        // // split signature
        // const r = signature.slice(0, 66);
        // const s = "0x" + signature.slice(66, 130);
        // const v = parseInt(signature.slice(130, 132), 16);
        // console.log({ r, s, v });
      } else {
        // 메타마스크가 설치되어있지 않다면 👉 alert 문구가 나온다
        alert("Install Metamask!");
      }
    } catch (error) {
      // 에러가 발생한다면 catch 실행
      console.error(error); // 👉 에러가 발생했다고 출력
    }
  };

  const newContact = async () => {
    // // 사인 메세지 보내는 툴
    // const msgParams = JSON.stringify({
    //   domain: {
    //     // Defining the chain aka Rinkeby testnet or Ethereum Main Net
    //     chainId: 1,
    //     // Give a user friendly name to the specific contract you are signing for.
    //     name: "",
    //     // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
    //     verifyingContract: { account },
    //     // Just let's you know the latest version. Definitely make sure the field name is correct.
    //     version: "1",
    //   },
    // // Defining the message signing data content.
    // message: {
    //   /*
    //    - Anything you want. Just a JSON Blob that encodes the data you want to send
    //    - No required fields
    //    - This is DApp Specific
    //    - Be as explicit as possible when building out the message schema.
    //   */
    //   contents: 'Hello, Bob!',
    //   attachedMoneyInEth: 4.2,
    //   from: {
    //     name: 'Cow',
    //     wallets: [
    //       '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    //       '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
    //     ],
    //   },
    //   to: [
    //     {
    //       name: 'Bob',
    //       wallets: [
    //         '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    //         '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
    //         '0xB0B0b0b0b0b0B000000000000000000000000000',
    //       ],
    //     },
    //   ],
    // },
    // // Refers to the keys of the *types* object below.
    // primaryType: 'Mail',
    // types: {
    //   // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
    //   EIP712Domain: [
    //     { name: 'name', type: 'string' },
    //     { name: 'version', type: 'string' },
    //     { name: 'chainId', type: 'uint256' },
    //     { name: 'verifyingContract', type: 'address' },
    //   ],
    //   // Not an EIP712Domain definition
    //   Group: [
    //     { name: 'name', type: 'string' },
    //     { name: 'members', type: 'Person[]' },
    //   ],
    //   // Refer to PrimaryType
    //   Mail: [
    //     { name: 'from', type: 'Person' },
    //     { name: 'to', type: 'Person[]' },
    //     { name: 'contents', type: 'string' },
    //   ],
    //   // Not an EIP712Domain definition
    //   Person: [
    //     { name: 'name', type: 'string' },
    //     { name: 'wallets', type: 'address[]' },
    //   ],
    // },
    // });
    // console.log(msgParams);
    //   const contract = new web3.eth.Contract(contractAbi, contractAddress);
    //   console.log(contract);
    //   console.log(contractAbi);
    //   console.log(account);
    //   const unlock = web3.eth.personal
    //     .unlockAccount(
    //       "0xfb976c58cbcd2601a7c1a004c84bddd6129b93c2",
    //       "roseperia1@",
    //       600
    //     )
    //     .then(console.log("Account unlocked!"));
    //   console.log(unlock);
    //   const signature = await web3.eth.sign(web3.utils.sha3("hello"), account);
    //   // console.log(account);
    //   console.log(signature);
    //   const newName = await contract.methods
    //     .verify(account, "hello", signature)
    //     .call();
    //   console.log(newName);
    //   // const data = await web3.eth.personal.sign(
    //   //   web3.eth.accounts.hashMessage("hello"),
    //   //   account,
    //   //   "dmorning2"
    //   // );
    //   // console.log(data);
    //   // web3.eth.accounts.hashMessage("Hello World");
    //   // contract.methods.getMessageHash("hello");
    //   // console.log(contract.methods.getMessageHash("hello"));
    // };
    // // web3.eth.getTransactionReceipt().then(console.log);
    // // const user = () => {
    // //   dispatch(createUser(privatekey,password))
    // // }
    // // const onClickDisConnect = () => {
    // //   setAccount(account === "");
  };

  const loadHome = () => {
    navigate("/main");
    newContact();
  };

  return (
    <>
      <Modal
        className="LoginModal"
        overlayClassName="LoginOverLay"
        isOpen={openLoginModal}
        onRequestClose={() => setOpenLoginModal(false)}
      >
        <div className="LoginModalQuestionContainer">
          <span className="LoginModalQuestion">
            메타마스크 지갑을 연결하시겠습니까?
          </span>
        </div>
        {account ? (
          <>
            <div className="LoginModalButtonContainer">
              <button className="LoginModalButton" onClick={loadHome}>
                <div className="LoginModalButtonWrapper">
                  <img className="LoginMetaMaskImg" src={metamaskfox} />
                  <span className="ConnetWalletSpan">
                    {account}메타마스크 지갑 연결!!!
                  </span>
                </div>
              </button>
            </div>
          </>
        ) : (
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
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
