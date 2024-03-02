import { useEffect, useState } from "react";
import "../styles/FullimgPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const FullimgPage = () => {

    const [loading, setLoading] = useState(true);
    const { listingId } = useParams();
    const navigate = useNavigate();
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

        <div className="fullimg-container">
            <div className="listing-fullimg">
                <div className="close" onClick={() => {
                    navigate(`/properties/${listingId}`);
                }} ><h1><IoClose /></h1></div>
                <div className="listing-container">
                    <div className="slider-listing">
                        <Swiper
                            speed={100}
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{
                                dynamicBullets: true,
                            }}
                            className="slider-img"
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
            </div>
        </div>
    );
};

export default FullimgPage;
