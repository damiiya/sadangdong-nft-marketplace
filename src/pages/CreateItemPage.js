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
import { serverUrl } from "../shared/api";
import { serverUrl_sol } from "../shared/api";
import { MintingSpinner } from "../elements/Spinner";

const CreateItemPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [file, setFile] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");
  const [start, setStart] = useState(false);

  // 필수입력값 Ref
  const fileInput = useRef();
  const nameInput = useRef();
  const descInput = useRef();
  const collectionSelect = useRef();

  const dispatch = useDispatch();
  const collectionName = useSelector((state) => state.item.collectionName);

  // 이미지 파일 가져오기
  const getImage = (e) => {
    setFile(e);
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
  const handleSubmit = async (TOKEN, hashData, account, tokenURI, ImgHash) => {
    const itemInfo = {
      token_id: TOKEN,
      ipfsJson: tokenURI,
      ipfsImage: ImgHash,
      hashdata: hashData,
      name: name,
      description: description,
      collection_name: selected,
    };
    const formData = new FormData();
    formData.append("itemInfo", JSON.stringify(itemInfo));
    formData.append("files", file);

    dispatch(postMintedItem(formData));
  };

  // 민팅
  const getMintNFT = async (account, tokenURI, ImgHash) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MintContractAddress,
        MINT_NFT_ABI,
        signer
      );
      const response = await axios.get(`${serverUrl}/api/items/lasttoken`);
      const getToken = ethers.utils.hexlify(Number(response.data.data));
      const TOKEN = response.data.data;
      const result = await axios
        .post(`${serverUrl}/api/items/temp`, { TOKEN_id: TOKEN })
        .catch((error) => {
          console.log(error);
        });

      const txn = await contract.mintNFT(tokenURI, getToken);
      const hashData = txn.hash;

      handleSubmit(TOKEN, hashData, account, tokenURI, ImgHash);
    } catch (error) {}
  };

  const getConnect = async (tokenURI, ImgHash) => {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        const SDDchainId = 1387;
        const SDD = `0x${SDDchainId.toString(16)}`;

        if (chainId === SDD) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          getMintNFT(account, tokenURI, ImgHash);
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: SDD }],
            });
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const account = accounts[0];
            getMintNFT(account, tokenURI, ImgHash);
          } catch (switchError) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: SDD,
                    chainName: "Sadangdong",
                    rpcUrls: [`${serverUrl_sol}`],
                  },
                ],
              });
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: SDD }],
              });
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              const account = accounts[0];
              getMintNFT(account, tokenURI, ImgHash);
            } catch (addError) {}
          }
        }
      } else {
        alert("메타마스크를 먼저 설치해주세요!");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.error(error);
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

      const tokenURI = `ipfs://${resJSON.data.IpfsHash}`;

      getConnect(tokenURI, ImgHash);
    } catch (error) {}
  };

  // 이미지 파일 Ipfshash로 변환
  const setFiletoIPFS = async (e) => {
    // 필수 입력값 value
    let fileValue = fileInput.current.files[0];
    let nameValue = nameInput.current.value;
    let descValue = descInput.current.value;
    let collectionValue = collectionSelect.current.value;
    e.preventDefault();
    if (fileValue && nameValue && descValue && collectionValue) {
      setStart(true);
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
      } catch (error) {}
    } else {
      alert("모든 정보를 입력해주세요!");
    }
  };

  // 아이템 이름 유효성 검사
  // 특수문자 제외 띄어쓰기 포함 8글자이하
  const checkName = (e) => {
    const regExp = /[^\w\sㄱ-힣\#]|[\_]/g;
    if (regExp.test(e.currentTarget.value)) {
      alert("특수문자는 입력하실수 없습니다.");

      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }

    if (e.currentTarget.value.length > 15) {
      alert("이름은 15자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  // 아이템 설명 유효성 검사
  // 200글자 이하
  const checkDesc = (e) => {
    if (e.currentTarget.value.length > 200) {
      alert("설명은 200자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
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

  if (start) {
    return <MintingSpinner />;
  }

  if (!isLoad) {
    return null;
  } else {
    return (
      <>
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
                    maxLength={16}
                    value={name}
                    ref={nameInput}
                    onChange={(e) => {
                      checkName(e);
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
                    maxLength={201}
                    value={description}
                    ref={descInput}
                    onChange={(e) => {
                      checkDesc(e);
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
                  ref={collectionSelect}
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
