import { useState } from "react";
import "../styles/ListingCard.scss";
import { ArrowForwardIos, ArrowBackIosNew, } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const ListingCard = ({
  _id,
  listingId,
  creator,
  aptSuite,
  listingPhotoPaths,
  bedroomCount,
  bathroomCount,
  area,
  category,
  type,
  contract,
  statusroom,
  price,
}) => {
  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `https://stellar-freedom-production.up.railway.app/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } else { return }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${_id}`);
      }}
    >

      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`https://stellar-freedom-production.up.railway.app/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="slider-container-m">
          <Swiper
            speed={0}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Pagination]}
            pagination={{
              dynamicBullets: true,
            }}
            className="slider-m"
          >
            {listingPhotoPaths?.map((photo, index) => (
              <SwiperSlide key={index} className="slide-m">
                <img
                  src={`https://stellar-freedom-production.up.railway.app/${photo?.replace("public", "")}`}
                  alt={`photo ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <h3>
        {aptSuite}
      </h3>
      <h5>{bedroomCount} ห้องนอน {bathroomCount} ห้องน้ำ {area} ตร.ม.</h5>
      <p>{category}</p>
      <>
        <p>{type}</p>
        <div className="price-contract">
          <div><span>{price}฿</span> ต่อเดือน</div>
          <div><h6>( สัญญาขั้นต่ำ {contract} เดือน )</h6></div>
        </div>
      </>

      <div className="statusroom">
        <p>{statusroom}</p>
      </div>

    </div>
  );
};

export default ListingCard;
