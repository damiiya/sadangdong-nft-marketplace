import React, { useEffect, useState } from "react";
import ItemDetail from "../components/itemauction/ItemDetail";
import Join from "../components/itemauction/Join";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadItemDetail } from "../redux/modules/itemSlice";
import Auction from "../components/itemauction/Auction";

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
    }
  });

  if (!isLoad) {
    return null;
  }
  return (
    <>
      <ItemDetail data={itemDetail} />
      {itemDetail.auction_progress ? (
        <>
          <Join data={itemDetail} />
          <Auction data={itemDetail} />
        </>
      ) : (
        <div className="ItemEmptyDiv"></div>
      )}
    </>
  );
};

export default ItemPage;
