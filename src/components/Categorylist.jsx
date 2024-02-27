import { categories } from "../data";
import "../styles/Categorylist.scss";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';


export default () => {
    const navigate = useNavigate();
    return (
        <div className="cate-swipe">
            <Swiper
                className="swiper-container"
                spaceBetween={10}
                slidesPerView={"3"}
                modules={[Autoplay, Navigation]}
                navigation
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                breakpoints={{
                    360:{
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
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
                        slidesPerView: 10,
                        spaceBetween: 45,
                    },
                }}
            >
                {categories?.slice(1, 16).map((category, index) => (
                    <SwiperSlide
                        className= "category"
                        key={index}
                        onClick={() => {
                            navigate(`/properties/category/${category.label}`);
                        }}
                    >
                        <div className="category_icon">{category.icon}</div>
                        <p>{category.label}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};