import React from "react";
// import companyLogo from "../../../src/assets/companyLogo.png";
import logo from "../../../src/assets/logo.png";

function Intro() {
  return (
    <section className="intro section-padding">
      <div className="container">
        <div className="row lg-marg">
          <div className="col-lg-8 md-mb80">
            <div className="row lg-marg align-items-center">
              <div className="col-md-6">
                <div className="img1 sm-mb50 align-items-center justify-content-center mx-auto">
                  {/* <img src="/assets/imgs/arw2.png" alt="" /> */}
                  <img src={logo} alt=""  style={{width:'200px',marginLeft:"40px"}}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text">
                  <h3 className="mb-30">
                    Sham Marians
                    <span className="fw-300">
                      Empowering Creativity & Driving Digital Success.
                    </span>
                  </h3>
                  <p>
                    We specialize in innovative{" "}
                    <span className="text-light fw-600">Branding</span>,
                    cutting-edge{" "}
                    <span className="text-light fw-600">web development</span>,
                    and strategic digital solutions to help businesses establish
                    a powerful online presence and achieve growth.
                  </p>

                  <a href="/page-about" className="underline main-color mt-40">
                    <span className="text">
                      More About Us <i className="ti-arrow-top-right"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="numbers mt-80">
              <div className="row lg-marg">
                <div className="col-md-6">
                  <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20">
                    <div>
                      <h3 className="fw-300 mb-10">100%</h3>
                      <h6 className="p-color sub-title">
                        Clients Satisfaction
                      </h6>
                    </div>
                    <div className="ml-auto">
                      <div className="icon-img-30">
                        <img src={logo} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20">
                    <div>
                      <h3 className="fw-300 mb-10">6478</h3>
                      <h6 className="p-color sub-title">Projects Completed</h6>
                    </div>
                    <div className="ml-auto">
                      <div className="icon-img-30">
                        <img src={logo} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="img-full fit-img">
              <img src="/assets/imgs/intro/04.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
