import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AD1 from './images/AD1.jpg';
import AD2 from './images/AD2.jpg';
import AD3 from './images/AD3.jpg';
import AD4 from './images/AD4.jpg';

import './style.css'; 

const TopDeals = () => {
    const deals = [
        { id: 1, img: AD1, link: "/mobiles", alt: "Mobile Deals" },
        { id: 2, img: AD2, link: "/men-top-wear", alt: "Men's Fashion" },
        { id: 3, img: AD3, link: "/women-top-wear", alt: "Women's Fashion" },
        { id: 4, img: AD4, link: "/laptops", alt: "Laptop Deals" },
    ];

    return (
        <section>
            <div className="w-full h-[540px]">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={40}
                    slidesPerView={1}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="mySwiper"
                >
                    {deals.map((deal) => (
                        <SwiperSlide key={deal.id}>
                            <Link to={deal.link}>
                                <img
                                    src={deal.img}
                                    alt={deal.alt}
                                    className="w-full h-[540px] object-cover object-center hover:opacity-95 transition-opacity duration-300"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TopDeals;