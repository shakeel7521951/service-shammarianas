'use client';
import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function Testimonials() {
  const swiperOptions = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 'auto',
      },
    },
    navigation: {
      nextEl: '.testim-modern .swiper-button-next',
      prevEl: '.testim-modern .swiper-button-prev',
    },
  };

  return (
    <section className="testim-modern section-padding sub-bg bord-top-grd bord-bottom-grd">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center">
            <div>
              <span className="sub-title main-color mb-5">Testimonials</span>
              <h3 className="fw-600 fz-50 text-u d-rotate wow">
                <span className="rotate-text">
                  Trusted <span className="fw-200">by Clients.</span>
                </span>
              </h3>
            </div>
            <div className="ml-auto">
              <div className="swiper-arrow-control">
                <div className="swiper-button-prev">
                  <span className="ti-arrow-left"></span>
                </div>
                <div className="swiper-button-next">
                  <span className="ti-arrow-right"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testim-swiper3 out-right" data-carousel="swiper" data-loop="true" data-space="30">
          <Swiper {...swiperOptions} id="content-carousel-container-unq-testim" className="swiper-container" data-swiper="container">
            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Outstanding Design</h6>
                  <div className="text">
                    <p>
                      “ The attention to detail in design exceeded all our expectations. The team's creativity shines through in every project they deliver. ”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="img fit-img">
                        <img src="/assets/imgs/testim/t1.jpg" alt="" />
                      </div>
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">Haitham Al-Dukhin</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">Envato Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Impressive User Experience</h6>
                  <div className="text">
                    <p>
                      “ Their designs don't just look good, they work seamlessly. A fantastic experience from start to finish. Highly recommend! ”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="img fit-img">
                        <img src="/assets/imgs/testim/t2.jpg" alt="" />
                      </div>
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">John Doe</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">CEO, Example Corp</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Excellent Service</h6>
                  <div className="text">
                    <p>
                      “ Their professionalism is unmatched. They helped us refine our brand, and the results speak for themselves. A true partner! ”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="img fit-img">
                        <img src="/assets/imgs/testim/t3.jpg" alt="" />
                      </div>
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">Sarah Lee</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">Marketing Director, Trendy Co.</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
