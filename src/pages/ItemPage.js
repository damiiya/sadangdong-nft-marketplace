import React, { useEffect, useState } from "react";
import ItemDetail from "../components/itemauction/ItemDetail";
import Join from "../components/itemauction/Join";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadItemDetail, loadBiddingList } from "../redux/modules/itemSlice";
import Auction from "../components/itemauction/Auction";
// import { serverUrl } from "../shared/api";
// import axios from "axios";

const ItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token_id = params.token_id;
  const [isLoad, setIsLoad] = useState(false);
  const itemDetail = useSelector((state) => state.item.itemDetail);
  const biddingList = useSelector((state) => state.item.biddingList);
  // const [biddingList, setBiddingList] = useState([]);

  console.log(itemDetail);

  useEffect(() => {
    dispatch(loadItemDetail(token_id));
  }, []);

  // setTimeout(() => {
  //   dispatch(loadItemDetail(token_id))
  // }, 100);

  useEffect(() => {
    const auction_id = itemDetail.auction_id;
    dispatch(loadBiddingList(auction_id));
  }, [token_id]);

  setTimeout(() => {
    if (biddingList) {
      setIsLoad(true);
    }
  }, 300);

  console.log(biddingList);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (itemDetail) {
  //       console.log("itemDetail", itemDetail);
  //       const auction_id = itemDetail.auction_id;

  //       console.log("auction_id: ", auction_id);
  //       try {
  //         console.log(1);
  //         const response = await axios.get(
  //           `${serverUrl}/api/offer/${auction_id}`
  //         );
  //         console.log(2);
  //         console.log(response.data.data);
  //         const data = response.data.data;
  //         return data;
  //         // setBiddingList(response.data.data);
  //         // setBiddingList((list) => [...list, biddingList]);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     // setIsLoad(false);
  //   };
  //   fetchData();
  //   // await dispatch(loadItemDetail(token_id))
  //   // await dispatch(loadBiddingList(auction_id))
  // }, [token_id]);

  // useEffect(() => {
  //   if (itemDetail && biddingList) {
  //     setIsLoad(true);
  //   }
  // });

  if (!isLoad) {
    return null;
  }
  return (
    <>
      <ItemDetail data={itemDetail} />
      {itemDetail.auction_progress ? (
        <>
          <Join data={itemDetail} />
          <Auction
            itemDetail={itemDetail}
            // biddingList={biddingList}
          />
        </>
      ) : (
        <div className="ItemEmptyDiv"></div>
      )}
    </>
  );
};

export default ItemPage;
