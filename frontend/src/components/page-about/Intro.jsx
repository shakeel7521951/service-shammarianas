import React from 'react';

function Intro() {
  return (
    <section className="page-intro section-padding pb-0">
      <div className="container">
        <div className="row md-marg">
          <div className="col-lg-6">
            <div className="img md-mb80">
              <div className="row">
                <div className="col-6">
                  <img src="/assets/imgs/intro/i1.jpg" alt="Sham Marians" />
                  <div className="img-icon">
                    <img src="/assets/imgs/arw0.png" alt="Arrow Icon" />
                  </div>
                </div>
                <div className="col-6 mt-40">
                  <img src="/assets/imgs/intro/i2.jpg" alt="Sham Marians Work" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="cont">
              <h3 className="mb-30">
                Sham Marians –{' '}
                <span className="fw-200">Empowering Businesses</span> with
                <span className="fw-200"> Digital Innovation</span>.
              </h3>
              <p>
                Sham Marians is dedicated to transforming businesses through cutting-edge digital solutions. 
                With expertise in branding, web development, and Video Production, we help brands establish a 
                strong online presence and achieve remarkable growth. Our commitment is to deliver creative, 
                high-impact solutions that drive success in the digital landscape.
              </p>
              <a href="/page-services" className="underline main-color mt-40">
                <span className="text">
                  Explore Our Services <i className="ti-arrow-top-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
