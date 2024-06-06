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

const LISTINGS_URL = "http://kkagency-api.onrender.com/properties";
const LISTINGS_SELL_URL = "http://kkagency-api.onrender.com/propertiesforsell";

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
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

  const getSearchListings = useCallback(async () => {
    try {
      setLoading(true);
      const [dataRent, dataSell] = await Promise.all([
        fetchListings(`${LISTINGS_URL}/search/${search}`, "rent"),
        fetchListings(`${LISTINGS_SELL_URL}/search/${search}`, "sell"),
      ]);
      const data = [...dataRent, ...dataSell];
      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.error("Fetch Listings Failed", err.message);
    } finally {
      setLoading(false);
    }
  }, [search, dispatch]);

  useEffect(() => {
    getSearchListings();
  }, [search, getSearchListings]);

  const sortedPosts = listings?.length ? [...listings].sort(() => -1) : [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderTitle = () => `ผลการค้นหา: ${search}`;

  const renderNoListingsMessage = () => (
    <h2>
      เราไม่พบประกาศจากคำค้นหา
      <br />
      "{search}"
      <br />
      กรุณาลองใหม่อีกครั้ง !!!
      <br />
      <img src="/assets/sad.png" alt="logo" />
    </h2>
  );

  return (
    <>
      <Helmet>
        <title>{search} | ใกล้ฉัน</title>
        <meta name="description" content="ใกล้ฉัน รวมประกาศ ขาย เช่า บ้าน คอนโด ทาวน์เฮ้าส์/ทาวน์โฮม หอพัก/โรงแรม อาคารพาณิชย์ สำนักงาน ที่ดิน เซ้งร้าน เซ้งกิจการ ขอนแก่น มีหลายโครงการ รายละเอียดครบ ค้นหาง่าย อัพเดททุกวัน" />
      </Helmet>

      <Navbar />
      <Categorylist />
      <h1 className="title-list">{renderTitle()}</h1>
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
                  {listing.listingType === "sell" ? (
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

export default SearchPage;
