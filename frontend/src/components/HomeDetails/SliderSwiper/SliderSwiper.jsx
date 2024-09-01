// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../../../assets/styles/Slider.scss";
import myAxios from "../../../api/axios"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCurrency } from '../../../context/CurrencyContext';
import { useMediaQuery } from "@mui/material";

const cacheSlider = {};

const SliderSwiper = () => {
  const { selectedCurrency } = useCurrency();
  const [sliderData, setSliderData] = useState([]);
  const matches = useMediaQuery("(max-width:1020px)");

  useEffect(() => {
    getPromotions();
  }, [selectedCurrency])

  const getPromotions = async () => {
    if (cacheSlider[selectedCurrency]) {
      setSliderData(cacheSlider[selectedCurrency]);
      return
    }

    try {
      const response = await myAxios.get("/promotions");
      const data = response.data.data
      cacheSlider[selectedCurrency] = data;
      setSliderData(data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setSliderData([]);
    }
  };

  return (
    <>
      <Swiper
        slidesPerView={matches ? 1.05 : 1}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={matches ? false : true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((data) => (
          <SwiperSlide key={data.id}>
            <Link to={`/promotions/${data.slug}`} className='w-full select-none'>
              <img className='rounded-[15px]' src={data.image_url} alt={data.name} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SliderSwiper;
