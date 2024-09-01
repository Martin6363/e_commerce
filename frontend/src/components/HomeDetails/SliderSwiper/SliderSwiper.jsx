// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../../../assets/styles/Slider.scss";
import myAxios from "../../../api/axios"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '../../../context/CurrencyContext';

const SliderSwiper = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const { selectedCurrency } = useCurrency();
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    getPromotions();
  }, [])

  const getPromotions = async () => {
    try {
      const response = await myAxios.get("/promotions");
      console.log(response.data);
      setSliderData(response.data.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setSliderData([]);
    }
  };
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };


  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {sliderData?.map((data) => (
          <SwiperSlide key={data.id}>
            <Link to={`/promotion/${data.slug}`} className='w-full select-none'>
              <img src={data.image_url} alt={data.name} />
            </Link>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default SliderSwiper;
