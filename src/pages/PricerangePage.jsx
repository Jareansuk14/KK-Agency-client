import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { setListings } from "../redux/state";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import Categorylist from "../components/Categorylist";
import Pagination from "../components/Pagination";
import "../styles/List.scss";

const PricerangePage = () => {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch parameter from URL
  const { pricerange } = useParams();

  // Redux state and dispatch
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  // Fetch listings based on price range
  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://kkagency-api.onrender.com/properties/pricerange/${pricerange}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  // Fetch listings on component mount and when pricerange changes
  useEffect(() => {
    getSearchListings();
  }, [pricerange]);

  // Pagination logic
  const sortedPosts = listings?.length ? [...listings].sort(() => -1) : [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>รวมประกาศที่พักให้เช่าในขอนแก่น ราคา{pricerange} | ใกล้ฉัน</title>
        <meta name="description" content="ใกล้ฉัน รวมประกาศ ขาย เช่า บ้าน คอนโด ทาวน์เฮ้าส์/ทาวน์โฮม หอพัก/โรงแรม อาคารพาณิชย์ สำนักงาน ที่ดิน เซ้งร้าน เซ้งกิจการ ขอนแก่น มีหลายโครงการ รายละเอียดครบ ค้นหาง่าย อัพเดททุกวัน" />
      </Helmet>

      <Navbar />
      <Categorylist />
      <h1 className="title-list">รวมประกาศราคา {pricerange} บาท</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentPosts.length === 0 ? (
            <div className="no-listings">
              <div className="no-listings-message">
                <h2>
                  ยังไม่มีประกาศว่างเลย !!!
                  <br />
                  <img src="/assets/Logo sad.png" alt="logo" />
                </h2>
              </div>
            </div>
          ) : (
            <div className="list">
              {currentPosts.map((listing) => (
                <ListingCard
                  key={listing._id}
                  _id={listing._id}
                  listingId={listing.listingId}
                  creator={listing.creator}
                  aptSuite={listing.aptSuite}
                  listingPhotoPaths={listing.listingPhotoPaths}
                  bedroomCount={listing.bedroomCount}
                  bathroomCount={listing.bathroomCount}
                  area={listing.area}
                  city={listing.city}
                  province={listing.province}
                  country={listing.country}
                  category={listing.category}
                  type={listing.type}
                  contract={listing.contract}
                  statusroom={listing.statusroom}
                  price={listing.price}
                />
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

export default PricerangePage;
