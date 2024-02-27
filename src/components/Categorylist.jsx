import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Categorylist.scss";
import { useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';


export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
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
        <div className="cate-swipe">
            <Swiper
                className="swiper-container"
                spaceBetween={20}
                slidesPerView={"3"}
                modules={[Autoplay, Navigation]}
                navigation
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 35,
                    },
                    1440: {
                        slidesPerView: 8,
                        spaceBetween: 40,
                    },
                    1600: {
                        slidesPerView: 12,
                        spaceBetween: 45,
                    },
                }}
            >
                {categories?.map((category, index) => (
                    <SwiperSlide
                        className={`category ${category.label === selectedCategory ? "selected" : ""}`}
                        key={index}
                    >
                        <div
                            className="category_icon"
                            onClick={() => {
                                navigate(`/properties/category/${category.label}`);
                            }}
                        >{category.icon}
                        </div>
                        <p>{category.label}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};