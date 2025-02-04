'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'; 
import 'swiper/css';

import brand1 from '../../../src/assets/BrandLogos/1.png';
import brand2 from '../../../src/assets/BrandLogos/2.png';
import brand3 from '../../../src/assets/BrandLogos/3.png';
import brand4 from '../../../src/assets/BrandLogos/4.png';
import brand5 from '../../../src/assets/BrandLogos/5.png';
import brand6 from '../../../src/assets/BrandLogos/6.png';
import brand7 from '../../../src/assets/BrandLogos/7.png';
import brand8 from '../../../src/assets/BrandLogos/8.png';
import brand9 from '../../../src/assets/BrandLogos/9.png';
import brand10 from '../../../src/assets/BrandLogos/10.png';
import brand11 from '../../../src/assets/BrandLogos/11.png';

const brandLogos = [
  brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9, brand10, brand11,
];

function Clients() {
  const swiperOptions = {
    modules: [Autoplay], 
    slidesPerView: 5,
    spaceBetween: 40,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 2 },
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
  };

  return (
    <section className="clients-carousel section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="sec-head text-center">
              <h3>
                We&lsquo;re proud to work with <br />
                a <span className="opacity-7">diverse range of companies.</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper {...swiperOptions} className="swiper-container">
          {brandLogos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="brand-item">
                <img src={logo} alt={`Brand ${index + 1}`} className="brand-logo" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="sec-bottom mt-100 text-center">
          <div className="main-bg d-flex align-items-center justify-content-center">
            <h6 className="fz-14 fw-400">
              More than <span className="fw-600"> 200+ companies</span> trusted us worldwide
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
