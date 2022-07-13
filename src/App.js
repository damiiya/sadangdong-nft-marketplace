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
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchListPage from "./pages/SearchListPage";
import SellingItemPage from "./pages/SellingItemPage";
import ApprovedAdminPage from "./pages/ApprovedAdminPage";
import RejectedAdminPage from "./pages/RejectedAdminPage";
import Footer from "./components/Footer";

import web3 from "./web3";

function App() {
  web3.eth.getAccounts().then(console.log);
  web3.eth
    .getBalance("0xa9F0571052289Ed8d731D511EDe36ece3df3d0D1")
    .then(console.log);
  // 62381a47d631f7460f1768b40ed5ec79d463e2c6

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="main" element={<MainPage />} />
        <Route path="list" element={<AllListPage />} />
        <Route path="search" element={<SearchListPage />} />
        <Route path="auctionlist" element={<AuctionListPage />} />
        <Route path="auction" element={<AuctionPage />} />
        <Route path="author" element={<AuthorPage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="itemauction" element={<ItemAuctionPage />} />
        <Route path="item" element={<ItemPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="account" element={<AccountPage />} />
        <Route path="createcollection" element={<CreateCollectionPage />} />
        <Route path="createitem" element={<CreateItemPage />} />
        <Route path="edititem" element={<EditItemPage />} />
        <Route path="editcollection" element={<EditCollectionPage />} />
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
