import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import CreateListingforsell from "./pages/CreateListingforsell";
import ListingDetails from "./pages/ListingDetails";
import ListingsellDetails from "./pages/ListingsellDetails";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import TypePage from "./pages/TypePage";
import PricerangePage from "./pages/PricerangePage";
import FullimgPage from "./pages/FullimgPage";
import NotfoundPage from "./pages/NotfoundPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/login-onlyadmin" element={<LoginPage />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/create-listing-forsell" element={<CreateListingforsell />} />
        <Route path="/properties/:listingId" element={<ListingDetails />} />
        <Route path="/propertiessell/:listingId" element={<ListingsellDetails />} />
        <Route path="/properties/fullimg/:listingId" element={<FullimgPage isForSale={false} />} />
        <Route path="/propertiessell/fullimg/:listingId" element={<FullimgPage isForSale={true} />} />
        <Route path="/properties/notfound" element={<NotfoundPage />} />
        <Route path="/properties/category/:category" element={<CategoryPage />} />
        <Route path="/properties/pricerange/:pricerange" element={<PricerangePage />} />
        <Route path="/properties/type/:type" element={<TypePage />} />
        <Route path="/properties/search/:search" element={<SearchPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
