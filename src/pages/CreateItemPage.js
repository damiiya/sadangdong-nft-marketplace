import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { createItem } from "../redux/modules/postSlice";
import uploadimage from "../assets/uploadimage.png";

const CreateItemPage = () => {
  const [imageSrc, setImageSrc] = useState("");

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

  // useDispatch;
  // createItem;

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
                />
              </div>
            </div>
            <div className="CreateItemDescriptionContainer">
              <span className="CreateItemDescriptionTittle">Description</span>
              <div>
                <textarea
                  className="CreateItemDescriptionTextArea"
                  placeholder="아이템 설명글을 작성해 주세요."
                />
              </div>
            </div>
            <div className="CreateItemDescriptionContainer">
              <span className="CreateItemSelectCollectionTittle">
                Collection Sellect
              </span>
              <select className="CreateItemSelectCollection">
                <option value="" disabled selected>
                  컬렉션을 선택해주세요.
                </option>
                <option>컬렉션1</option>
                <option>컬렉션2</option>
                <option>컬렉션3</option>
                <option>컬렉션4</option>
              </select>
            </div>
            <div className="CreateItemSupplyContainer">
              <span className="CreateItemSupplyTittle">Supply</span>
              <div className="CreateItemSupplyInputContainer">
                <input className="CreateItemSupplyInput" placeholder="0" />
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
                <option>폴리곤</option>
                <option>클레이튼</option>
              </select>
            </div>
          </div>
          <div className="CreateItemButtonContainer">
            <button className="CreateItemButton">Create</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateItemPage;
