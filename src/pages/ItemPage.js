import React, { useEffect, useState } from "react";
import ItemDetail from "../components/ItemDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadItemDetail } from "../redux/modules/itemSlice";

const ItemPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const token_id = params.token_id;

  const itemDetail = useSelector((state) => state.item.itemDetail);

  useEffect(() => {
    dispatch(loadItemDetail(token_id));
  }, []);

  useEffect(() => {
    if (itemDetail) {
      setIsLoad(true);
    }
  });

  if (!isLoad) {
    return null;
  } else {
    return (
      <>
        <ItemDetail data={itemDetail} />
      </>
    );
  }
};
export default ItemPage;
