import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCollection,
  loadCollectionDetail,
  deleteCollection,
} from "../redux/modules/collectionSlice";
import { useParams } from "react-router-dom";
import uploadimage from "../assets/uploadimage.png";

const EditCollectionPage = (props) => {
  const dispatch = useDispatch();
  const fileInputA = useRef();
  const fileInputB = useRef();
  const name = useRef();
  const desc = useRef();
  const commission = useRef();
  const params = useParams();
  const collectionId = params.collectionId;

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
    formData.append("files", file1, "bannerImg");
    formData.append("files", file2, "featuredImg");
    dispatch(
      editCollection({ formData: formData, collectionId: collectionId })
    );
  };

  const deleteSubmit = () => {
    dispatch(deleteCollection(collectionId));
  };

  const [inputName, setInputName] = useState("");
  const [inputDescrition, setInputDescription] = useState("");
  const [inputCommission, setInputCommission] = useState("");

  useEffect(() => {
    dispatch(loadCollectionDetail(collectionId));
  }, []);

  const collectionDetail = useSelector(
    (state) => state.collection.collectionDetail
  );

  console.log(collectionDetail);

  useEffect(() => {
    if (collectionDetail) {
      setInputName(collectionDetail.name);
      setInputDescription(collectionDetail.description);
      setInputCommission(collectionDetail.commission);
    }
  }, [collectionDetail]);

  if (!collectionDetail) {
    return <h1>hi</h1>;
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
                  onChange={(event) => {
                    setInputName(event.currentTarget.value);
                  }}
                  value={inputName}
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
                  onChange={(event) => {
                    setInputDescription(event.target.value);
                  }}
                  value={inputDescrition}
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
                  ref={commission}
                  onChange={(event) => {
                    setInputCommission(event.target.value);
                  }}
                  value={inputCommission}
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
