import React, { useState, useRef } from "react";
import { contractAbi } from "../abi";
import { contractAddress } from "../shared/api";
// import { useDispatch } from "react-redux";
// import { createItem } from "../redux/modules/postSlice";
import uploadimage from "../assets/uploadimage.png";
// import { nftStorageKey } from "../shared/api";
// import { NFTStorage } from "nft.storage";

const CreateItemPage = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [itemName, setItemName] = useState("");
  const [status, setStatus] = useState("");
  const [desc, setDesc] = useState("");
  const fileInput = useRef();

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

  const onClickMint = async () => {
    // First we use the nft.storage client library to add the image and metadata to IPFS / Filecoin
    // const client = new NFTStorage({ token: nftStorageKey });
    // setStatus("Uploading to nft.storage...");
    // const metadata = await client.store({
    //   itemName,
    //   desc,
    //   fileInput,
    // });
    // setStatus(
    //   `Upload complete! Minting token with metadata URI: ${metadata.url}`
    // );
    // // the returned metadata.url has the IPFS URI we want to add.
    // // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
    // const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
  };

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
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
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
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="CreateItemDescriptionContainer">
              <span className="CreateItemSelectCollectionTittle">
                Collection Sellect
              </span>
              <select className="CreateItemSelectCollection">
                <option value="" disabled>
                  컬렉션을 선택해주세요.
                </option>
                <option>컬렉션1</option>
                {/* <option>컬렉션2</option>
                <option>컬렉션3</option>
                <option>컬렉션4</option> */}
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
                <option value="" disabled selected>
                  발행할 코인을 선택해주세요.
                </option>
                <option>ETH</option>
                {/* <option>폴리곤</option>
                <option>클레이튼</option> */}
              </select>
            </div>
          </div>
          <div className="CreateItemButtonContainer">
            <button className="CreateItemButton" onClick={onClickMint}>
              Create
            </button>
            <span>{status}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateItemPage;
