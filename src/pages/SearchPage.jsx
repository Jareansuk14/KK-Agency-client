import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import Categorylist from "../components/Categorylist";
import Pagination from "../components/Pagination";
import { Helmet } from 'react-helmet';

const SearchPage = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)
  const dispatch = useDispatch()
  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://kkagency-api.onrender.com/properties/search/${search}`, {
        method: "GET"
      })

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])

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
        <title>{search} | KK Agency</title>
      </Helmet>

      <Navbar />
      <Categorylist />
      <h1 className="title-list">ผลการค้นหา : {search}</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentPosts.length === 0 ? (
            <div className="no-listings">
              <div className="no-listings-message">
                <h2>เราไม่พบประกาศจากคำค้นหา <br />
                  "{search}" <br />
                  กรุณาลองใหม่อีกครั้ง !!! <br />
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

export default SearchPage