import { useState, useEffect } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import Categorylist from "../components/Categorylist";
import Pagination from "../components/Pagination";
import { Helmet } from 'react-helmet';

const CategoryPage = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const { pricerange } = useParams()
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch()
  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://kkagency-api.onrender.com/properties/pricerange/${pricerange}`, {
        method: "GET",
      })

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Listings Failed", err.message)
    }
  }

  useEffect(() => {
    getSearchListings();
  }, [pricerange]);

  //get current posts and sortPosts
  const sortedPosts = listings?.length ? [...listings].sort(() => -1) : [];
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  //change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>รวมประกาศที่พักให้เช่าในขอนแก่น ราคา{pricerange} | KK Agency</title>
        <meta name="description" content="KKAgency รวมประกาศ ให้เช่า บ้าน คอนโด ทาวน์เฮ้าส์/ทาวน์โฮม หอพัก/โรงแรม อาคารพาณิชย์ สำนักงาน ที่ดิน เซ็งร้าน เซ็งกิจการ ในจังหวัดขอนแก่น มีหลายโครงการ รายละเอียดครบ ค้นหาง่าย อัพเดททุกวัน" />
      </Helmet>

      <Navbar />
      <Categorylist />
      <h1 className="title-list">รวมที่พักราคา {pricerange} บาท</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentPosts.length === 0 ? (
            <div className="no-listings">
              <div className="no-listings-message">
                <h2>ตอนนี้เรายังไม่มีที่พักราคา <br />
                  "{pricerange} บาท" <br />
                  ว่างเลย !!! <br />
                  <img src="/assets/sad.png" alt="logo" />
                </h2>
              </div>
            </div>
          ) : (
            <div className="list">
              {currentPosts.map(
                ({
                  _id,
                  creator,
                  aptSuite,
                  listingPhotoPaths,
                  bedroomCount,
                  bathroomCount,
                  area,
                  city,
                  province,
                  country,
                  category,
                  type,
                  contract,
                  statusroom,
                  price,
                }) => (
                  <ListingCard
                    key={_id}
                    listingId={_id}
                    creator={creator}
                    aptSuite={aptSuite}
                    listingPhotoPaths={listingPhotoPaths}
                    bedroomCount={bedroomCount}
                    bathroomCount={bathroomCount}
                    area={area}
                    city={city}
                    province={province}
                    country={country}
                    category={category}
                    type={type}
                    contract={contract}
                    statusroom={statusroom}
                    price={price}
                  />
                )
              )}
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

export default CategoryPage;