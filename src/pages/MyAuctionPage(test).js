// //삭제
// import React, { useState } from "react";
// export default function MyAuctionPage() {
//   const [category, setCategory] = useState(0);

//   const showOngoing = () => {
//     setCategory(0);
//   };

//   const showComplete = () => {
//     setCategory(1);
//   };
//   return (
//     <>
//       <div className="MyAuctionPageContainer">
//         <div className="MyAuctionPageMenuWrapper">
//           {category === 0 ? (
//             <>
//               <div
//                 className="MyAuctionPageMenuCheckedTitle_1"
//                 onClick={showOngoing}
//               >
//                 경매 진행중
//               </div>
//               <div
//                 className="MyAuctionPageMenuUncheckedTitle_2"
//                 onClick={showComplete}
//               >
//                 경매완료
//               </div>
//             </>
//           ) : (
//             <>
//               <div
//                 className="MyAuctionPageMenuUncheckedTitle_1"
//                 onClick={showOngoing}
//               >
//                 경매 진행중
//               </div>
//               <div
//                 className="MyAuctionPageMenuCheckedTitle_2"
//                 onClick={showComplete}
//               >
//                 경매완료
//               </div>
//             </>
//           )}
//         </div>
//         {category === 0 && (
//           <div className="activity-container">
//             <div className="MyAuctionPageContentTitleWrapper">
//               <span className="ContentTitleImage">이미지</span>
//               <span className="ContentTitleItem">아이템명</span>
//               <span className="ContentTitleAuctionStart">경매 시작 시간</span>
//               <span className="ContentTitleAuctionEnd">경매 종료 시간</span>
//               <span className="ContentTitleAuctionHighestBid">
//                 현재 최고 입찰가
//               </span>
//               <span className="ContentTitleAuctionMyBid">입찰가격</span>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentHighestBid">99.999</span>
//               <div className="ContentMyBid">99.999</div>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentHighestBid">99.999</span>
//               <div className="ContentMyBid">99.999</div>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentHighestBid">99.999</span>
//               <div className="ContentMyBid">99.999</div>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentHighestBid">99.999</span>
//               <div className="ContentMyBid">99.999</div>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentHighestBid">99.999</span>
//               <div className="ContentMyBid">99.999</div>
//             </div>
//           </div>
//         )}
//         {category === 1 && (
//           <div className="activity-container">
//             <div className="MyAuctionPageContentTitleWrapper">
//               <span className="ContentTitleImage">이미지</span>
//               <span className="ContentTitleItem">아이템명</span>
//               <span className="ContentTitleAuctionStart">경매 시작 시간</span>
//               <span className="ContentTitleAuctionEnd">경매 종료 시간</span>

//               <span className="ContentTitleAuctionWinningBid">최종 낙찰가</span>
//               <span className="ContentTitleAuctionMyBid">입찰가</span>
//               <span className="ContentTitleAuctionMyBidResult">입찰결과</span>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentWinningBid">99.999</span>
//               <span className="ContentMyBidding">99.999</span>
//               <div className="ContentMyBidSuccessResult">
//                 경매에 성공하셨습니다!
//               </div>
//             </div>
//             <div className="activity-container">
//               <div className="MyAuctionPageContentImageWrapper">
//                 <img />
//               </div>
//               <span className="ContentItemName">Item name#1</span>
//               <span className="ContentAuctionStart">2022.06.30.23:59:59</span>
//               <span className="ContentAuctionEnd">2022.06.30.23:59:59</span>
//               <span className="ContentWinningBid">99.999</span>
//               <span className="ContentMyBidding">99.999</span>
//               <div className="ContentMyBidFailureResult">
//                 아쉽지만 유찰되었습니다.
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
