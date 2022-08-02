// ** 처리한 사항은 [v]표시로 바꿔주세요!
// []모든 인풋값이 입력되지 않았을 때 오류메세지를 alert로 띄워줘야함!(수정하다가 인풋값이 비어있는 경우가 발생할 수 있음)

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCollection,
  loadCollectionDetail,
  deleteCollection,
} from "../redux/modules/collectionSlice";
import {
  loadCollectionDetailItem,
  loadCollectionDetailAuction,
} from "../redux/modules/itemSlice";
import { useNavigate, useParams } from "react-router-dom";
import uploadimage from "../assets/uploadimage.png";

const EditCollectionPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputA = useRef();
  const fileInputB = useRef();
  const name = useRef();
  const desc = useRef();
  const commission = useRef();
  const params = useParams();
  const collectionId = params.collectionId;

  // 컬렉션 상세정보
  const collectionDetail = useSelector(
    (state) => state.collection.collectionDetail
  );
  // 컬렉션 아이템정보
  const collectionItem = useSelector((state) => state.item.collectionitem);
  // 컬렉션 경매정보
  const collectionAuction = useSelector(
    (state) => state.item.collectionauction
  );

  const [imageSrc, setImageSrc] = useState(false);

  const encodeBannerImage = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const [featuredImageSrc, setFeaturedImageSrc] = useState(false);
  const encodeFeaturedImage = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFeaturedImageSrc(reader.result);
        resolve();
      };
    });
  };

  // 컬렉션 수정하기
  const handleSubmit = () => {
    let file1 = fileInputA.current.files[0];
    let file2 = fileInputB.current.files[0];

    const fileInfo = {
      name: name.current.value,
      desc: desc.current.value,
      commission: commission.current.value,
    };
    const formData = new FormData();
    formData.append("fileInfo", JSON.stringify(fileInfo));
    if (file1) {
      formData.append("files", file1, "bannerImg");
    }
    if (file2) {
      formData.append("files", file2, "featuredImg");
    }

    dispatch(
      editCollection({
        formData: formData,
        collectionId: collectionId,
        navigate: navigate,
        fileInfo: fileInfo,
      })
    );
  };

  // 컬렉션 삭제하기
  const deleteSubmit = () => {
    if (collectionItem.length > 0 || collectionAuction.length > 0) {
      alert(
        "아이템이 있는 컬렉션은 삭제가 불가능 합니다. 먼저 아이템을 삭제해주세요"
      );
    } else {
      dispatch(
        deleteCollection({ collectionId: collectionId, navigate: navigate })
      );
    }
  };

  // 기존 컬렉션 데이터 받아오기
  const [inputName, setInputName] = useState("");
  const [inputDescrition, setInputDescription] = useState("");
  const [inputCommission, setInputCommission] = useState("");

  useEffect(() => {
    dispatch(loadCollectionDetail(collectionId));
    dispatch(loadCollectionDetailItem(collectionId));
    dispatch(loadCollectionDetailAuction(collectionId));
  }, []);

  // 컬렉션 이름 유효성 검사
  // 특수문자 제외 띄어쓰기 포함 8글자 이하
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
  // 컬렉션 설명 유효성 검사
  // 띄어쓰기 포함 200글자 이하
  const checkDesc = (e) => {
    if (e.currentTarget.value.length > 50) {
      alert("설명은 50자 이하만 가능합니다!");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  // Creator Earnings 유효성 검사
  // 숫자만 가능
  const checkNumber = (e) => {
    const regExpNum = /^[0-9]*(\.?\d*)$/;
    if (!regExpNum.test(e.currentTarget.value)) {
      alert("숫자만 입력해주세요");
      e.currentTarget.value = e.currentTarget.value.substring(
        0,
        e.currentTarget.value.length - 1
      );
    }
  };

  if (!collectionDetail) {
    return null;
  }

  return (
    <>
      <div className="CreateCollectionContainer">
        <div className="CreateCollectionWrapper">
          <span className="CreateCollectionTittle">컬렉션 수정</span>
          <div className="CreateCollectionContent">
            <div className="CreateCollectionBannerImageContainer">
              <span className="CreateCollectionBannerImageTittle">
                Banner Image
              </span>
              <div className="CreateCollectionBannerImageWrapper">
                {!imageSrc ? (
                  <img
                    className="CollectionImagePreview"
                    src={collectionDetail && collectionDetail.banner_image}
                    alt="preview-img"
                  />
                ) : (
                  <img
                    className="CollectionImagePreview"
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
                ref={fileInputA}
                onChange={(e) => {
                  encodeBannerImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="CreateCollectionFeaturedImageContainer">
              <span className="CreateCollectionFeaturedImageTittle">
                Featured Image
              </span>
              <div className="CreateCollectionFeaturedImageWrapper">
                {!featuredImageSrc ? (
                  <img
                    className="CollectionFeaturedImagePreview"
                    src={collectionDetail && collectionDetail.feature_image}
                    alt="preview-img"
                  />
                ) : (
                  <img
                    className="CollectionFeaturedImagePreview"
                    src={featuredImageSrc}
                    alt="preview-img"
                  />
                )}
              </div>
              <label htmlFor="CreateFeaturedImageFile">
                <div className="CreateInputFileCircle">
                  <img src={uploadimage} />
                </div>
              </label>
              <input
                type="file"
                id="CreateFeaturedImageFile"
                style={{ display: "none" }}
                ref={fileInputB}
                onChange={(e) => {
                  encodeFeaturedImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="CreateCollectionTittleInputContainer">
              <span className="CreateCollectionNameTittle">Collection</span>
              <div>
                <input
                  type="text"
                  className="CreateCollectionTittleInput"
                  placeholder="컬렉션 이름을 입력해 주세요."
                  ref={name}
                  maxLength={9}
                  onChange={(e) => {
                    checkName(e);
                    setInputName(e.currentTarget.value);
                  }}
                  defaultValue={collectionDetail.name}
                />
              </div>
            </div>
            <div className="CreateCollectionDescriptionContainer">
              <span className="CreateCollectionDescriptionTittle">
                Description
              </span>
              <div>
                <textarea
                  className="CreateCollectionDescriptionTextArea"
                  placeholder="컬렉션 설명글을 작성해 주세요."
                  ref={desc}
                  maxLength={51}
                  onChange={(e) => {
                    checkDesc(e);
                    setInputDescription(e.target.value);
                  }}
                  defaultValue={collectionDetail.description}
                />
              </div>
            </div>
            <div className="CreateCollectionCreatorEarningsContainer">
              <span className="CreateCollectionCreatorEarningsTittle">
                Creator Earnings
              </span>
              <div>
                <input
                  className="CreateCollectionCreatorEarningsInput"
                  placeholder="9.99 ETH"
                  type="text"
                  ref={commission}
                  onChange={(e) => {
                    setInputCommission(e.target.value);
                    checkNumber(e);
                  }}
                  defaultValue={collectionDetail.commission}
                />
              </div>
            </div>
          </div>

          <div className="CreateItemButtonContainer">
            <button className="EditItemButton" onClick={handleSubmit}>
              Edit
            </button>
            <button className="DeleteBuutton" onClick={deleteSubmit}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCollectionPage;
