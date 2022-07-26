import React, { useEffect, useState } from "react";
import ItemDetail from "../components/itemauction/ItemDetail";
import JoinAuction from "../components/itemauction/JoinAuction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadItemDetail } from "../redux/modules/itemSlice";
import Auction from "../components/itemauction/Auction";

const ItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;
  const [isLoad, setIsLoad] = useState(false);
  const [visible, setVisible] = useState(false);
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
  }
  return (
    <>
      <ItemDetail data={itemDetail} />
      {visible ? <JoinAuction data={itemDetail} /> : null}
      {visible ? null : <Auction data={itemDetail} />}
    </>
  );
};

export default ItemPage;
