import { useEffect, useState } from "react";
import "../styles/FullimgPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';

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
            <h1 className="close" onClick={() => { navigate(`/properties/${listingId}`); }} ><IoClose /></h1>
            <Swiper
                zoom={true}
                speed={0}
                spaceBetween={1000}
                slidesPerView={1}
                loop={true}
                modules={[Navigation, Pagination, Zoom]}
                navigation
                pagination={{
                    type: 'fraction',
                }}
                className="slider-img"
            >
                {listing.listingPhotoPaths?.map((photo, index) => (
                    <SwiperSlide key={index} className="slide">
                        <div className="swiper-zoom-container">
                            <img
                                src={`https://kkagency-api.onrender.com/${photo?.replace("public", "")}`}
                                alt={`photo ${index + 1}`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FullimgPage;
