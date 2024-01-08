import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../styles.css/Carrousel.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_URL}/products/featured`,
        });
        setFeaturedProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedProducts();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="swiper-container-product">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          stretch: 0,
          depth: 100,
          rotate: 0,
          modifier: 2.5,
        }}
        breakpoints={{
          540: {
            slidesPerView: 3,
          },
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {featuredProducts.map((featuredProduct) => (
          <SwiperSlide key={featuredProduct.id}>
            <div
              onClick={() => {
                navigate(`/product/${featuredProduct.id}`);
                window.location.reload();
                scrollToTop();
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                className="img-carrousel"
                src={`${import.meta.env.VITE_BACKET_URL}/${
                  featuredProduct.img
                }`}
                alt={featuredProduct.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
