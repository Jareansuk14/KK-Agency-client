import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import WishList from "./pages/WishList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import TypePage from "./pages/TypePage";
import PricerangePage from "./pages/PricerangePage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/login-onlyadmin" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/pricerange/:pricerange" element={<PricerangePage />} />
          <Route path="/properties/type/:type" element={<TypePage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
