import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/main/Header";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import AllListPage from "./pages/AllListPage";
import AuctionListPage from "./pages/AuctionListPage";
import CollectionPage from "./pages/CollectionPage";
import CreateCollectionPage from "./pages/CreateCollectionPage";
import CreateItemPage from "./pages/CreateItemPage";
import EditItemPage from "./pages/EditItemPage";
import EditCollectionPage from "./pages/EditCollectionPage";
import ItemPage from "./pages/ItemPage";
import MainPage from "./pages/MainPage";
import SearchListPage from "./pages/SearchListPage";
import SellingItemPage from "./pages/SellingItemPage";
import ApprovedAdminPage from "./pages/ApprovedAdminPage";
import RejectedAdminPage from "./pages/RejectedAdminPage";
import EditAccountPage from "./pages/EditAccountPage";
import MyActivityPage from "./pages/MyActivityPage";
import Footer from "./components/main/Footer";
import UserTest from "./elements/UserTest";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* 리스트 */}
        <Route path="list" element={<AllListPage />} />
        <Route path="list/search/:keyword" element={<SearchListPage />} />
        <Route path="list/auctionlist" element={<AuctionListPage />} />

        {/* 상세페이지 */}
        <Route
          path="detail/collection/:collectionId"
          element={<CollectionPage />}
        />
        <Route path="detail/item/:token_id" element={<ItemPage />} />

        {/* 생성&수정&삭제 */}
        <Route path="createcollection" element={<CreateCollectionPage />} />
        <Route
          path="editcollection/:collectionId"
          element={<EditCollectionPage />}
        />

        <Route path="createitem" element={<CreateItemPage />} />
        <Route path="edititem/:token_id" element={<EditItemPage />} />

        {/* 유저페이지 */}
        <Route path="account/:token_id" element={<AccountPage />} />
        <Route path="account/edit/:token_id" element={<EditAccountPage />} />
        <Route
          path="account/myactivity/:token_id"
          element={<MyActivityPage />}
        />
        <Route path="account/sell/:token_id" element={<SellingItemPage />} />

        {/* 관리자페이지 */}
        <Route path="admin" element={<AdminPage />} />
        <Route path="approved" element={<ApprovedAdminPage />} />
        <Route path="rejected" element={<RejectedAdminPage />} />
      </Routes>
      <Footer />
      <UserTest />
    </div>
  );
}

export default App;
