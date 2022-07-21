import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import AllListPage from "./pages/AllListPage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionPage from "./pages/AuctionPage";
import AuthorPage from "./pages/AuthorPage";
import CollectionPage from "./pages/CollectionPage";
import CreateCollectionPage from "./pages/CreateCollectionPage";
import CreateItemPage from "./pages/CreateItemPage";
import EditItemPage from "./pages/EditItemPage";
import EditCollectionPage from "./pages/EditCollectionPage";
import ItemAuctionPage from "./pages/ItemAuctionPage";
import ItemPage from "./pages/ItemPage";
import MainPage from "./pages/MainPage";
import SearchListPage from "./pages/SearchListPage";
import SellingItemPage from "./pages/SellingItemPage";
import ApprovedAdminPage from "./pages/ApprovedAdminPage";
import RejectedAdminPage from "./pages/RejectedAdminPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="list" element={<AllListPage />} />
        <Route path="search" element={<SearchListPage />} />
        <Route path="auctionlist" element={<AuctionListPage />} />
        <Route path="auction" element={<AuctionPage />} />
        <Route path="author" element={<AuthorPage />} />
        <Route path="collection/:collectionId" element={<CollectionPage />} />
        <Route path="itemauction" element={<ItemAuctionPage />} />
        <Route path="item" element={<ItemPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="createcollection" element={<CreateCollectionPage />} />
        <Route path="createitem" element={<CreateItemPage />} />
        <Route path="edititem" element={<EditItemPage />} />
        <Route
          path="editcollection/:collectionId"
          element={<EditCollectionPage />}
        />
        <Route path="selling" element={<SellingItemPage />} />

        <Route path="admin" element={<AdminPage />} />
        <Route path="approved" element={<ApprovedAdminPage />} />
        <Route path="rejected" element={<RejectedAdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
