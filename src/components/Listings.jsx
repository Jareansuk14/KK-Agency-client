import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "ทั้งหมด"
          ? `https://kkagency-api.onrender.com/properties?category=${selectedCategory}`
          : "https://kkagency-api.onrender.com/properties",
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
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
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
                price={price}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
