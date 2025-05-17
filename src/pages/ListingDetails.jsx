import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { facilities } from "../data";
import { IoCall } from "react-icons/io5";
import { FaLine, FaFacebookMessenger } from "react-icons/fa6";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import { BedOutlined, ShowerOutlined, Restaurant, SquareFoot } from '@mui/icons-material/';
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { Helmet } from 'react-helmet';

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const ListingDetails = () => {

  //button contact
  const PhoneCall = () => {
    const phoneNumber = '0990554324'; // replace with the phone number you want to call
    window.open(`tel:${phoneNumber}`);
  };

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      {listing && listing.listingPhotoPaths && listing.listingPhotoPaths.length > 0 ? (
        <>
          <Helmet>
            <title>{listing.title}</title>
            <meta name="description" content={listing.description} />
          </Helmet>
          
          <Navbar />
          <div className="listing-details">
            <div className="container">
              <Swiper
                speed={0}
                spaceBetween={80}
                slidesPerView={1}
                loop={true}
                modules={[Navigation, Pagination]}
                navigation
                pagination={{
                  dynamicBullets: true,
                }}
                className="slider"
              >
                {listing.listingPhotoPaths?.map((photo, index) => (
                  <SwiperSlide key={index} className="slide">
                    <div className="swiper-container">
                      <img
                        src={`https://kkagency-api.onrender.com/${photo?.replace("public", "")}`}
                        alt={`photo ${index + 1}`}
                        onClick={() => {
                          navigate(`/properties/fullimg/${listingId}`);
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <h2 className="title-hero">
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
              <img src="/assets/Logo.png" alt="" />
              <h3>
                Create post by {listing.creator.firstName} {listing.creator.lastName} <img className="verified" src="/assets/verified.png" alt="" />
              </h3>
            </div>
            <hr />

            <h3>รายละเอียด</h3>
            <p className="description">{listing.description}</p>
            <Link className="locationbtn" to={listing.location} target="_blank"><LocationOnSharpIcon />ดูแผนที่</Link>
            <hr />

            <h3>{listing.highlight} ({listing.statusroom})</h3>
            <p className="description">{listing.highlightDesc}</p>
            <h4 className="contract">( สัญญาขั้นต่ำ {listing.contract} เดือน )</h4>
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
                <li><a className="call" onClick={PhoneCall}><IoCall sx={{ fontSize: "50px", color: "#FFF" }} /></a></li>
                <li><a className="facebook" href="https://www.facebook.com/profile.php?id=100067895833848" target="_blank"><FaFacebookMessenger /></a></li>
                <li><a className="line" href="https://lin.ee/OfC9JTI"><FaLine /></a></li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        // If listingPhotoPaths is not found or empty, navigate to "/"
        <Navigate to="/properties/notfound" replace={true} />
      )}
    </>
  );
};

export default ListingDetails;
