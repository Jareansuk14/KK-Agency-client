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

const CategoryPage = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const [loading, setLoading] = useState(true);
  const { category } = useParams()
  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `https://kkagency-api.onrender.com/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  //get current posts and sortPosts
  const sortedPosts = [...listings].sort(() => {return-1});
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  //change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Categorylist />
      <h1 className="title-list">{category}</h1>
      <div className="list">
        {currentPosts?.map(
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
      <Pagination
          totalPosts={listings.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      <Footer />
    </>
  );
};

export default CategoryPage;
