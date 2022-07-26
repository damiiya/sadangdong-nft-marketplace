import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCollectionSelect,
  loadItemDetail,
  editItem,
  deleteItem,
} from "../redux/modules/itemSlice";
import uploadimage from "../assets/uploadimage.png";
import { PINATA_JWT } from "../shared/api";
import axios from "axios";

const EditItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");

  // 아이템 삭제하기
  const handleDelete = () => {
    dispatch(deleteItem(token_id));
  };

  // 수정 요청하기
  const handleSubmit = async (tokenURI) => {
    const itemInfo = {
      token_id: token_id,
      name: name,
      description: description,
      collection_id: selected,
    };

    dispatch(editItem({ itemInfo: itemInfo, token_id: token_id }));
  };

  // tokenURI 받기
  const editJsontoIPFS = async (e) => {
    try {
      const editData = {
        ipfsPinHash: itemDetail.ipfsJson,
        name: name,
        keyvalues: {
          name: name,
          description: description,
        },
      };

      const resJSON = await axios({
        method: "put",
        url: "https://api.pinata.cloud/pinning/hashMetadata",
        body: editData,
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "content-type": "application/json",
        },
      });
      console.log(resJSON);
      console.log("okay");

      handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  // 기존 아이템 데이터 받아오기
  const [isLoad, setIsLoad] = useState(false);
  const itemDetail = useSelector((state) => state.item.itemDetail);
  const collectionName = useSelector((state) => state.item.collectionName);

  useEffect(() => {
    dispatch(getCollectionSelect());
    dispatch(loadItemDetail(token_id));
  }, []);

  useEffect(() => {
    if (collectionName && itemDetail) {
      setIsLoad(true);
    }
  }, [collectionName, itemDetail]);

  if (!isLoad) {
    return null;
  }
  console.log(itemDetail);
  return (
    <>
      <div className="CreateItemContainer">
        <div className="CreateItemWrapper">
          <span className="CreateItemTittle"> 아이템 수정</span>
          <div className="CreateItemContent">
            <div className="CreateItemImageContainer">
              <span className="CreateItemImageTittle">Item image</span>
              <div className="CreateItemImageWrapper">
                <img
                  className="CollectionImagePreview"
                  src={itemDetail.image}
                  alt="preview_img"
                />
              </div>
              <label htmlFor="CreateItemFile">
                <div className="CreateInputFileCircle">
                  <img src={uploadimage} />
                </div>
              </label>
            </div>
            <div className="CreateItemTittleInputContainer">
              <span className="CreateItemNameTittle">Item</span>
              <div>
                <input
                  className="CreateItemTittleInput"
                  placeholder="아이템 이름을 입력해 주세요."
                  defaultValue={itemDetail.name}
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
                  defaultValue={itemDetail.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="CreateItemDescriptionContainer">
              <span className="CreateItemSelectCollectionTittle">
                Collection Sellect
              </span>
              <select
                className="CreateItemSelectCollection"
                key={itemDetail.collection_name}
                defaultValue={itemDetail.collection_name}
                onChange={(e) => {
                  setSelected(e.target.value);
                }}
              >
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
            <button className="EditItemButton" onClick={editJsontoIPFS}>
              Edit
            </button>
            <button className="DeleteBuutton" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItemPage;
