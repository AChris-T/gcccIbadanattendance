import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Ensure this import

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const GallerySlider = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const images = import.meta.glob("../assets/gallery/*.{png,jpg,jpeg,svg}");

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = Object.keys(images).map((path) =>
        images[path]().then((mod) => mod.default)
      );
      const urls = await Promise.all(imagePromises);
      setImageUrls(urls);
    };
    loadImages();
  }, []);

  return (
    <div>
      <h5
        style={{ fontFamily: "Lobster Two, sans-serif" }}
        className="text-[#ec3538] text-center font-bold"
      >
        Our pictures
      </h5>
      <h3 className="w-full flex justify-center text-[#757575] font-semibold text-[32px] leading-10 text-center">
        Our pictures speak a lot about us
      </h3>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 5000, // Set a proper delay
          disableOnInteraction: false, // Ensures autoplay doesn't stop on user interaction
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper w-[100%] pt-[50px] pb-[50px]"
      >
        {imageUrls.map((src, index) => (
          <SwiperSlide
            key={index}
            className={index === 0 ? "w-[300px] h-[300px]" : ""}
          >
            <img src={src} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySlider;
