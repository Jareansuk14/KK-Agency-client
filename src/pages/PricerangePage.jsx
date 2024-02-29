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

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { pricerange } = useParams()
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch()
  const getSearchListings = async () => {
    try { 
        const response = await fetch(`https://kkagency-api.onrender.com/properties/pricerange/${pricerange}`,{
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

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Categorylist />
      <h1 className="title-list">รวมที่พักราคา {pricerange} บาท</h1>
      <div className="list">
        {listings?.map(
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
      <Footer />
    </>
  );
};

export default CategoryPage;