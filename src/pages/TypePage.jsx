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

const TypePage = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const [loading, setLoading] = useState(true)
  const { type } = useParams()
  const listings = useSelector((state) => state.listings)
  const dispatch = useDispatch()
  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://kkagency-api.onrender.com/properties/type/${type}`, {
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
  }, [type])

  //get current posts and sortPosts
  const sortedPosts = [...listings].sort(() => {return-1});
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  //change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <Categorylist />
      <h1 className="title-list">{type}</h1>
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
}

export default TypePage