import { useEffect, useState } from "react";
import "../styles/FullimgPage.scss";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const LISTINGS_URL = "https://kkagency-api.onrender.com/properties";
const LISTINGS_SELL_URL = "https://kkagency-api.onrender.com/propertiesforsell";

const FullimgPage = ({ isForSale }) => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    const url = isForSale ? LISTINGS_SELL_URL : LISTINGS_URL;

    try {
      const response = await fetch(`${url}/${listingId}`, {
        method: "GET",
      });

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const handleNavigation = () => {
    const targetPath = isForSale ? `/propertiessell/${listingId}` : `/properties/${listingId}`;
    navigate(targetPath);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      {listing && listing.listingPhotoPaths && listing.listingPhotoPaths.length > 0 ? (
        <div className="fullimg-container">
          <div className="close"><h1 onClick={handleNavigation}><IoClose /></h1></div>
          <Swiper
            speed={0}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
              type: 'fraction',
            }}
            className="slider-img"
          >
            {listing.listingPhotoPaths?.map((photo, index) => (
              <SwiperSlide key={index} className="slide">
                <div className="swiper-container">
                  <img
                    src={`https://kkagency-api.onrender.com/${photo?.replace("public", "")}`}
                    alt={`photo ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <Navigate to="/properties/notfound" replace={true} />
      )}
    </>
  );
};

export default FullimgPage;
