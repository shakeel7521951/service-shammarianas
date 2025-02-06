"use client";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetStocksQuery } from "../../features/stocksApi";

function Portfolio() {
  const marquess = ["Our Portfolio"];
  const AllMarquess = Array(10).fill(marquess).flat();

  const swiperOptions = {
    modules: [Pagination, Navigation],
    slidesPerView: "auto",
    spaceBetween: 80,
    loop: true,
    touchRatio: 0.2,
    speed: 1500,
    pagination: {
      el: ".work-crev .swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".work-crev .swiper-button-next",
      prevEl: ".work-crev .swiper-button-prev",
    },
  };

  const { data, isLoading, error } = useGetStocksQuery();
  const stocks = data?.stocks?.slice(0, 3); // Get only the first three stocks

  return (
    <section className="work-fade section-padding sub-bg bord-top-grd bord-bottom-grd mb-80">
      <div className="container position-re">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center">
            <div>
              <span className="sub-title main-color mb-5">Our Stock</span>
              <h3 className="fw-600 fz-50 text-u d-rotate wow">
                <span className="rotate-text">
                  Trending<span className="fw-200">Stock.</span>
                </span>
              </h3>
            </div>
            <div className="ml-auto vi-more">
              <a href="/stock" className="butn butn-sm butn-bord radius-30">
                <span>View All</span>
              </a>
              <span className="icon ti-arrow-top-right"></span>
            </div>
          </div>
        </div>

        <div className="row mb-80">
          <div className="container">
            <div className="gallery row md-marg">
              {isLoading ? (
                <p>Loading stocks...</p>
              ) : error ? (
                <p>Error loading stocks.</p>
              ) : (
                stocks?.map((stock, index) => (
                  <div key={index} className="col-lg-4 col-md-6 items design">
                    <div className="item mb-50 hoverEffect">
                      <div className="img">
                        <img src={stock.stockImageUrl} alt={stock.title} />
                      </div>
                      <div className="contentShow">
                        <div>
                          <span className="p-color mb-5 sub-title">
                            {stock.category}
                          </span>
                          <p>{stock.description}</p>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          <a href="/stock">
                            <i className="ti-arrow-top-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="swiper-pagination"></div>
      </div>

      <div className="marq-head">
        <div className="main-marq xlrg text-u o-hidden">
          <div className="slide-har st1">
            <div className="box">
              {AllMarquess.map((item, i) => (
                <div key={i} className="item">
                  <h4>{item}</h4>
                </div>
              ))}
            </div>
            <div className="box">
              {AllMarquess.map((item, i) => (
                <div key={i} className="item">
                  <h4>{item}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
