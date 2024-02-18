import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useParams } from "react-router-dom";
import { facilities } from "../data";
import { LuPhoneCall, LuMail } from "react-icons/lu";
import { FaLine } from "react-icons/fa6";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BedOutlined, ShowerOutlined, Restaurant, SquareFoot } from '@mui/icons-material/';
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `https://kkagency-api.onrender.com/properties/${listingId}`,
        {
          method: "GET",
        }
      );

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

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">

        <div className="container">
          <div className="slider-container">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{
                dynamicBullets: true,
              }}
              className="slider"
            >
              {listing.listingPhotoPaths?.map((photo, index) => (
                <SwiperSlide key={index} className="slide">
                  <img
                    src={`https://kkagency-api.onrender.com/${photo?.replace("public", "")}`}
                    alt={`photo ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <h2>
          {listing.title}
        </h2>

        <div className="details">
          <p>{listing.bedroomCount} ห้องนอน <BedOutlined /></p>
          <p>{listing.bathroomCount} ห้องน้ำ <ShowerOutlined /></p>
          <p>{listing.guestCount} ห้องครัว <Restaurant /></p>
          <p>{listing.area} ตร.ม. <SquareFoot /></p>
        </div>

        <hr />

        <div className="profile">
          <img
            src={`https://kkagency-api.onrender.com/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          />
          <h3>
            Create post by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>รายละเอียด</h3>
        <p className="description">{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p className="description">{listing.highlightDesc}</p>
        <hr />

        <div className="facilities">
          <div>
            <h2>สิ่งอำนวยความสะดวก</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />

        <div className="contact">
          <h2>ช่องทางติดต่อ</h2>
          <ul>
            <li><a href="#"><LuPhoneCall /> 061-324-5678</a></li>
            <li><a href="#"><LuMail /> KKAgency@gmail.com</a></li>
            <li><a href="#"><FaLine /> @Test123</a></li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
