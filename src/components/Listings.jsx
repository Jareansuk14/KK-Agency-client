import { useEffect, useState } from "react";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import ListingCardSell from "./ListingCardSell";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import Paginationhome from "./Paginationhome";

const LISTINGS_URL = "http://kkagency-api.onrender.com/properties";
const LISTINGS_SELL_URL = "http://kkagency-api.onrender.com/propertiesforsell";

const CATEGORIES = {
  ALL: "ทั้งหมด",
  RENT: "เช่า",
  SELL: "ขาย",
};

const Listings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [activeButton, setActiveButton] = useState(CATEGORIES.ALL); // New state

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const fetchListings = async (url, type) => {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data.map((item) => ({ ...item, listingType: type }));
  };

  const getFeedListings = async () => {
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
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  const sortedPosts = listings?.length ? [...listings].sort(() => -1) : [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveButton(category); // Update active button state
  };

  return (
    <div className="listings-container">
      <h1 className="title-promo">รวมประกาศทั้งหมด</h1>
      <div className="buttons-container">
        <div className="buttons-container2">
          <div className="buttons">
            {Object.values(CATEGORIES).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={activeButton === category ? "active" : ""}
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
      {listings && (
        <Paginationhome
          totalPosts={listings.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Listings;

