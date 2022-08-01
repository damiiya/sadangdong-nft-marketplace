// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []민팅할때 로딩시간이 너무 오래걸려서 스피너를 사용하거나 다른 처리가 필요함

import React, { useState, useRef, useEffect } from "react";
import { MintContractAddress } from "../shared/api";
import { useDispatch, useSelector } from "react-redux";
import uploadimage from "../assets/uploadimage.png";
import { ethers } from "ethers";
import { MINT_NFT_ABI } from "../contracts/mintabi";
import { PINATA_API_KEY, PINATA_API_SECRET } from "../shared/api";
import axios from "axios";
import {
  getCollectionSelect,
  postMintedItem,
} from "../redux/modules/itemSlice";
// import Spinner from "../elements/Spinner";

const CreateItemPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [file, setFile] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");
  const fileInput = useRef();

  const dispatch = useDispatch();
  const collectionName = useSelector((state) => state.item.collectionName);
  console.log(collectionName);

  // 이미지 파일 가져오기
  const getImage = (e) => {
    setFile(e);
    console.log(file);
  };

  // 이미지 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // formData로 요청하기
  const handleSubmit = async (tokenID, tokenURI, ImgHash) => {
    const itemInfo = {
      token_id: tokenID,
      ipfsJson: tokenURI,
      ipfsImage: ImgHash,
      name: name,
      description: description,
      collection_id: selected,
    };
    console.log(itemInfo);
    const formData = new FormData();
    formData.append("itemInfo", JSON.stringify(itemInfo));
    formData.append("files", file);
    console.log(formData);

    dispatch(postMintedItem(formData));
  };

  // 민팅
  const getMintNFT = async (tokenURI, ImgHash) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log("현재 계정:", account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MintContractAddress,
        MINT_NFT_ABI,
        signer
      );

      const txn = await contract.mintNFT(tokenURI);
      const tx = await provider.getTransaction(txn.hash);
      const receipt = await tx.wait();
      console.log(receipt);

      const getmintItem = await contract.getNftTokens(account);
      console.log(getmintItem);

      const tokensOwned = await contract.balanceOf(account);
      const tokenIds = [];

      for (let i = 0; i < tokensOwned; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        tokenIds.push(tokenId.toString());
      }

      const tokenID = tokenIds[tokenIds.length - 1];
      console.log(tokenID);

      handleSubmit(tokenID, tokenURI, ImgHash);
    } catch (error) {
      console.log("Error while minting NFT with contract");
      console.log(error);
    }
  };

  // tokenURI 받기
  const sendJsontoIPFS = async (ImgHash) => {
    try {
      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          name: name,
          description: description,
          image: ImgHash,
        },
        headers: {
          pinata_api_key: `${PINATA_API_KEY}`,
          pinata_secret_api_key: `${PINATA_API_SECRET}`,
        },
      });

      console.log("final ", `ipfs://${resJSON.data.IpfsHash}`);
      const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;
      console.log("Token URI", tokenURI);

      getMintNFT(tokenURI, ImgHash);
    } catch (error) {
      console.log("JSON to IPFS: ");
      console.log(error);
    }
  };

  // 이미지 파일 Ipfshash로 변환
  const setFiletoIPFS = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${PINATA_API_KEY}`,
            pinata_secret_api_key: `${PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        sendJsontoIPFS(ImgHash);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(getCollectionSelect());
  }, []);

  useEffect(() => {
    if (collectionName) {
      setIsLoad(true);
    }
  }, [collectionName]);

  // useEffect(() => {
  //   if (!tokenID && tokenURI && ImgHash) {
  //     return <Spinner />;
  //   }
  // }, [tokenID, tokenURI, ImgHash]);

  if (!isLoad) {
    return null;
  } else {
    return (
      <>
        {/* <Spinner /> */}
        <div className="CreateItemContainer">
          <div className="CreateItemWrapper">
            <span className="CreateItemTittle">아이템 생성</span>
            <div className="CreateItemContent">
              <div className="CreateItemImageContainer">
                <span className="CreateItemImageTittle">Item image</span>
                <div className="CreateItemImageWrapper">
                  {imageSrc && (
                    <img
                      className="ImagePreivew"
                      src={imageSrc}
                      alt="preview-img"
                    />
                  )}
                </div>
                <label htmlFor="CreateItemFile">
                  <div className="CreateInputFileCircle">
                    <img src={uploadimage} />
                  </div>
                </label>
                <input
                  type="file"
                  id="CreateItemFile"
                  ref={fileInput}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    encodeFileToBase64(e.target.files[0]);
                    getImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="CreateItemTittleInputContainer">
                <span className="CreateItemNameTittle">Item</span>
                <div>
                  <input
                    className="CreateItemTittleInput"
                    placeholder="아이템 이름을 입력해 주세요."
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="CreateItemDescriptionContainer">
                <span className="CreateItemDescriptionTittle">Description</span>
                <div>
                  <textarea
                    className="CreateItemDescriptionTextArea"
                    placeholder="아이템 설명글을 작성해 주세요."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="CreateItemDescriptionContainer">
                <span className="CreateItemSelectCollectionTittle">
                  Collection Select
                </span>
                <select
                  className="CreateItemSelectCollection"
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    컬렉션을 선택해주세요.
                  </option>
                  {collectionName.map((list, i) => (
                    <option value={list.name}>{list.name}</option>
                  ))}
                </select>
              </div>
              <div className="CreateItemSupplyContainer">
                <span className="CreateItemSupplyTittle">Supply</span>
                <div className="CreateItemSupplyInputContainer">
                  <input
                    className="CreateItemSupplyInput"
                    placeholder="1"
                    disabled
                  />
                  <span className="CreateItemSupplySpan">개</span>
                </div>
              </div>
              <div className="CreateItemBlockChainContainer">
                <span className="CreateItemBlockChainTittle">Block Chain</span>
                <select className="CreateItemSelectCollection">
                  <option value="" disabled>
                    발행할 코인을 선택해주세요.
                  </option>
                  <option selected>ETH</option>
                </select>
              </div>
            </div>
            <div className="CreateItemButtonContainer">
              <button className="CreateItemButton" onClick={setFiletoIPFS}>
                Create
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CreateItemPage;
