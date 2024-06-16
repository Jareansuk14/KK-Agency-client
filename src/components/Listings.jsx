import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "./Loader";
import ListingCard from "./ListingCard";
import ListingCardSell from "./ListingCardSell";
import Paginationhome from "./Paginationhome";
import "../styles/Listings.scss";

const LISTINGS_URL = "https://kkagency-api.onrender.com/properties";
const LISTINGS_SELL_URL = "https://kkagency-api.onrender.com/propertiesforsell";

const CATEGORIES = {
  ALL: "ทั้งหมด",
  RENT: "เช่า",
  SELL: "ขาย",
};

const Listings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const fetchListings = async (url, type) => {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data.map((item) => ({ ...item, listingType: type }));
  };

  const getFeedListings = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];

      if (selectedCategory === CATEGORIES.RENT) {
        data = await fetchListings(LISTINGS_URL, CATEGORIES.RENT);
      } else if (selectedCategory === CATEGORIES.SELL) {
        data = await fetchListings(LISTINGS_SELL_URL, CATEGORIES.SELL);
      } else {
        const [dataRent, dataSell] = await Promise.all([
          fetchListings(LISTINGS_URL, CATEGORIES.RENT),
          fetchListings(LISTINGS_SELL_URL, CATEGORIES.SELL),
        ]);
        data = [...dataRent, ...dataSell];
      }

      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.error("Fetch Listings Failed", err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    getFeedListings();
  }, [getFeedListings]);

  const sortedPosts = listings?.length ? [...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  return (
    <>
      <Helmet>
        <title>รวมประกาศทั้งหมด | ใกล้ฉัน</title>
        <meta name="description" content="รวมประกาศทั้งหมด ขาย เช่า บ้าน คอนโด และอื่นๆ อัพเดททุกวัน" />
      </Helmet>

      <div className="listings-container">
        <h1 className="title-promo">รวมประกาศทั้งหมด</h1>
        <div className="buttons-container">
          <div className="buttons-container2">
            <div className="buttons">
              {Object.values(CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "active" : ""}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="listings">
            {currentPosts.map((listing) => (
              <div key={listing._id}>
                {listing.listingType === CATEGORIES.SELL ? (
                  <ListingCardSell {...listing} />
                ) : (
                  <ListingCard {...listing} />
                )}
              </div>
            ))}
          </div>
        )}
        {listings.length > 0 && (
          <Paginationhome
            totalPosts={listings.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default Listings;
