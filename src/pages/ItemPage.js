import React, { useEffect, useState } from "react";
import ItemDetail from "../components/ItemDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadItemDetail } from "../redux/modules/itemSlice";

const ItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;
  const [isLoad, setIsLoad] = useState(false);
  const itemDetail = useSelector((state) => state.item.itemDetail);

  useEffect(() => {
    dispatch(loadItemDetail(token_id));
  }, []);

  useEffect(() => {
    if (itemDetail) {
      setIsLoad(true);
      console.log("done");
    }
  });

  if (!isLoad) {
    return null;
  }
  return (
    <>
      <ItemDetail data={itemDetail} />
    </>
  );
};

export default ItemPage;
