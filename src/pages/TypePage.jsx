import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import ListingCardSell from "../components/ListingCardSell";
import Footer from "../components/Footer";
import Categorylist from "../components/Categorylist";
import Pagination from "../components/Pagination";
import "../styles/List.scss";

const CATEGORIES = {
  ALL: "ทั้งหมด",
  RENT: "เช่า",
  SELL: "ขาย",
};

const LISTINGS_URL = "https://kkagency-api.onrender.com/properties";
const LISTINGS_SELL_URL = "https://kkagency-api.onrender.com/propertiesforsell";

const TypePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);

  const fetchListings = async (url, type) => {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data.map((item) => ({ ...item, listingType: type }));
  };

  const getSearchListings = useCallback(async () => {
    try {
      setLoading(true);
      let data = [];

      if (selectedCategory === CATEGORIES.RENT) {
        data = await fetchListings(`${LISTINGS_URL}/type/${type}`, CATEGORIES.RENT);
      } else if (selectedCategory === CATEGORIES.SELL) {
        data = await fetchListings(`${LISTINGS_SELL_URL}/type/${type}`, CATEGORIES.SELL);
      } else {
        const [dataRent, dataSell] = await Promise.all([
          fetchListings(`${LISTINGS_URL}/type/${type}`, CATEGORIES.RENT),
          fetchListings(`${LISTINGS_SELL_URL}/type/${type}`, CATEGORIES.SELL),
        ]);
        data = [...dataRent, ...dataSell];
      }

      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.error("Fetch Listings Failed", err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, type, dispatch]);

  useEffect(() => {
    getSearchListings();
  }, [type, selectedCategory, getSearchListings]);

  const sortedPosts = listings?.length ? [...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderTitle = () => {
    if (selectedCategory === CATEGORIES.RENT) {
      return `รวมประกาศให้เช่า ${type}`;
    } else if (selectedCategory === CATEGORIES.SELL) {
      return `รวมประกาศขาย ${type}`;
    } else {
      return `รวมประกาศ ${type}`;
    }
  };

  const renderNoListingsMessage = () => {
    const messagePrefix = `ตอนนี้เรายังไม่มีประกาศ`;
    const messageSuffix = selectedCategory === CATEGORIES.RENT ? "ให้เช่าเลย !!!" : selectedCategory === CATEGORIES.SELL ? "ขายเลย !!!" : "เลย !!!";

    return (
      <h2>
        {messagePrefix}
        <br />
        {messageSuffix}
        <br />
        <img src="/assets/Logo sad.png" alt="logo" />
      </h2>
    );
  };

  return (
    <>
      <Helmet>
        <title>รวมประกาศที่พักให้เช่าในขอนแก่น ประเภท{type} | ใกล้ฉัน</title>
        <meta name="description" content="ใกล้ฉัน รวมประกาศ ขาย เช่า บ้าน คอนโด ทาวน์เฮ้าส์/ทาวน์โฮม หอพัก/โรงแรม อาคารพาณิชย์ สำนักงาน ที่ดิน เซ้งร้าน เซ้งกิจการ ขอนแก่น มีหลายโครงการ รายละเอียดครบ ค้นหาง่าย อัพเดททุกวัน" />
      </Helmet>

      <Navbar />
      <Categorylist />
      <h1 className="title-list">{renderTitle()}</h1>
      <div className="buttons-container">
        <div className='buttons-container2'>
          <div className='buttons'>
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
        <>
          {currentPosts.length === 0 ? (
            <div className="no-listings">
              <div className="no-listings-message">
                {renderNoListingsMessage()}
              </div>
            </div>
          ) : (
            <div className="list">
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
            <Pagination
              totalPosts={listings.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default TypePage;
