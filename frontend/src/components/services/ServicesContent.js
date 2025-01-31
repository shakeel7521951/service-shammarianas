'use client';
import initIsotope from '../../common/initIsotope';
import React, { useEffect } from 'react';

const services = [
  {
    category: "design",
    title: "Graphic Designing",
    description: "Creative branding and UI/UX design",
    image: "/assets/imgs/works/2/1.jpg",
  },
  {
    category: "development",
    title: "Web Development",
    description: "Custom websites & web apps",
    image: "/assets/imgs/works/2/2.jpg",
  },
  {
    category: "marketing",
    title: "Social Media Marketing",
    description: "Boost engagement & brand awareness",
    image: "/assets/imgs/works/2/3.jpg",
  },
  {
    category: "design",
    title: "Video Editing",
    description: "High-quality video production",
    image: "/assets/imgs/works/2/4.jpg",
  },
  {
    category: "development",
    title: "App Development",
    description: "Android & iOS mobile apps",
    image: "/assets/imgs/works/2/5.jpg",
  },
  {
    category: "marketing",
    title: "SEO Optimization",
    description: "Rank higher on search engines",
    image: "/assets/imgs/works/2/6.jpg",
  },
  {
    category: "design",
    title: "Logo Designing",
    description: "Unique logos for brands",
    image: "/assets/imgs/works/2/7.jpg",
  },
  {
    category: "marketing",
    title: "Content Marketing",
    description: "Engaging blogs & content strategy",
    image: "/assets/imgs/works/2/8.jpg",
  },
  {
    category: "development",
    title: "E-Commerce Development",
    description: "Build online stores with ease",
    image: "/assets/imgs/works/2/9.jpg",
  }
];

function ServicesContent() {
  useEffect(() => {
    initIsotope();
  }, []);

  return (
    <section className="work-grid section-padding">
      <div className="container">
        <div className="row mb-80">
          <div className="col-lg-4">
            <div className="sec-head">
              <h6 className="sub-title main-color mb-10">DISCOVER SERVICES</h6>
              <h3>Trending Services</h3>
            </div>
          </div>
          <div className="filtering col-lg-8 d-flex justify-content-end align-items-end">
            <div>
              <div className="filter">
                <span data-filter="*" className="active" data-count="09">All</span>
                <span data-filter=".design" data-count="03">Design</span>
                <span data-filter=".development" data-count="03">Development</span>
                <span data-filter=".marketing" data-count="03">Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container">
        <div className="gallery row md-marg">
          {services.map((service, index) => (
            <div key={index} className={`col-lg-4 col-md-6 items ${service.category}`}>
              <div className="item mb-50">
                <div className="img">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="cont d-flex align-items-end mt-30">
                  <div>
                    <span className="p-color mb-5 sub-title">{service.title}</span>
                    <h6>{service.description}</h6>
                  </div>
                  <div className="ml-auto">
                    <a href="/project-details">
                      <span className="ti-arrow-top-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesContent;
