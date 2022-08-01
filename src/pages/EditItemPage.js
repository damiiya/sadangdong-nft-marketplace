import React, { useState, useEffect, useRef } from "react";
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

const token = sessionStorage.getItem("auth_token");

const EditItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [selected, setSelected] = useState(null);

  // onchange 사용시, 변경된 내용이 없을 경우 onchange에 감지가 안되서 Ref사용
  const nameRef = useRef();
  const descRef = useRef();
  const collectionRef = useRef();

  // 아이템 삭제하기
  const handleDelete = () => {
    dispatch(deleteItem(token_id));
  };

  // 수정 요청하기
  const handleSubmit = async (tokenURI) => {
    // 아이템 정보 Ref current value
    const nameValue = nameRef.current.value;
    const descValue = descRef.current.value;
    const collectionValue = collectionRef.current.value;

    const itemInfo = {
      token_id: token_id,
      name: nameValue,
      description: descValue,
      collection_name: collectionValue,
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

  // 아이템 이름 유효성 검사
  const checkName = (e) => {
    const regExp = /[^\w\sㄱ-힣]|[\_]/g;
    if (regExp.test(e.currentTarget.value)) {
      alert("특수문자는 입력하실 수 없습니다.");

      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }

    if (e.currentTarget.value.length > 8) {
      alert("이름은 8자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  // 아이템 설명 유효성 검사
  const checkDesc = (e) => {
    if (e.currentTarget.value.length > 200) {
      alert("설명은 200자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  if (!isLoad) {
    return null;
  }

  // if (!token) {
  //   alert("수정 권한이 없습니다!");
  //   window.location.href = "/";
  // }

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
                <div className="CreateInputFileCircle"></div>
              </label>
            </div>
            <div className="CreateItemTittleInputContainer">
              <span className="CreateItemNameTittle">Item</span>
              <div>
                <input
                  className="CreateItemTittleInput"
                  placeholder="아이템 이름을 입력해 주세요."
                  maxLength={9}
                  defaultValue={itemDetail.name}
                  ref={nameRef}
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
                  defaultValue={itemDetail.description}
                  ref={descRef}
                  onChange={(e) => {
                    checkDesc(e);
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
                ref={collectionRef}
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
