  "use client";
import React, { useEffect } from "react";
import companyLogo from "../../../src/assets/companyLogo.png";
import { useGetUserQuery, useSignOutMutation } from "../../features/usersApi";
import { Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery();

  const [signOut] = useSignOutMutation();

  const handleLogOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  function handleScroll() {
    const bodyScroll = window.scrollY;
    const navbar = document.querySelector(".navbar");

    if (bodyScroll > 300) navbar.classList.add("nav-scroll");
    else navbar.classList.remove("nav-scroll");
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleDropdownMouseMove(event) {
    const dropdownMenu = event.currentTarget.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      dropdownMenu.classList.add("show");
    }
  }

  function handleDropdownMouseLeave(event) {
    const dropdownMenu = event.currentTarget.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }
  }

  function handleToggleNav() {
    if (
      document
        .querySelector(".navbar .navbar-collapse")
        .classList.contains("show")
    ) {
      document
        .querySelector(".navbar .navbar-collapse")
        .classList.remove("show");
    } else if (
      !document
        .querySelector(".navbar .navbar-collapse")
        .classList.contains("show")
    ) {
      document.querySelector(".navbar .navbar-collapse").classList.add("show");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bord blur">
      <div className="container o-hidden">
        <a className="logo icon-img-100" href="/">
          <img src={companyLogo} alt="logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggleNav}
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            {/* <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="rolling-text">Demos</span>
              </a>
              <div className="dropdown-menu mega-menu">
                <div className="container">
                  <div className="row">
                    <div className="col-lg">
                      <a className="item-img text-center" href="/home-main">
                        <span className="img">
                          <img src="/assets/imgs/menu/1.png" alt="" />
                        </span>
                        <span className="mt-15">Main Home</span>
                      </a>
                    </div>
                    <div className="col-lg">
                      <a
                        className="item-img text-center"
                        href="/home-modern-studio"
                      >
                        <span className="img">
                          <img src="/assets/imgs/menu/2.png" alt="" />
                        </span>
                        <span className="mt-15">Modern Studio</span>
                      </a>
                    </div>
                    <div className="col-lg">
                      <a
                        className="item-img text-center"
                        href="/home-creative-agency"
                      >
                        <span className="img">
                          <img src="/assets/imgs/menu/3.png" alt="" />
                        </span>
                        <span className="mt-15">Creative Agency</span>
                      </a>
                    </div>
                    <div className="col-lg">
                      <a
                        className="item-img text-center"
                        href="/home-digital-agency"
                      >
                        <span className="img">
                          <img src="/assets/imgs/menu/4.png" alt="" />
                        </span>
                        <span className="mt-15">Digital Agency</span>
                      </a>
                    </div>
                    <div className="col-lg">
                      <a className="item-img text-center" href="/home-personal">
                        <span className="img">
                          <img src="/assets/imgs/menu/5.png" alt="" />
                        </span>
                        <span className="mt-15">Freelancer</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li> */}
            <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="/"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="rolling-text">Home</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/page-about">
                    About Us
                  </a>
                </li>
                {/* <li>
                  <a className="dropdown-item" href="/page-services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/page-services-details">
                    Services Details
                  </a>
                </li> */}
                {/* <li>
                  <a className="dropdown-item" href="/page-team">
                    Our Team
                  </a>
                </li> */}
                {/* <li>
                  <a className="dropdown-item" href="/page-team-details">
                    Team Details
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/page-contact">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/page-FAQ">
                    FAQS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/page-404">
                    Error 404
                  </a>
                </li> */}
              </ul>
            </li>
            <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="/services"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="rolling-text">Services</span>
              </a>
            </li>
            <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="/portfolio"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="rolling-text">Portfolio</span>
              </a>
              {/* <div className="dropdown-menu">
                <a className="dropdown-item" href="/portfolio-gallery">
                  Gallery
                </a>
                <a className="dropdown-item" href="/portfolio-creative">
                  Portfolio Creative
                </a>
                <a
                  className="dropdown-item"
                  href="/portfolio-creative-carousel"
                >
                  Creative Carousel
                </a>
                <a className="dropdown-item" href="/portfolio-grid">
                  Portfolio Grid
                </a>
                <a className="dropdown-item" href="/portfolio-masonry">
                  Portfolio Masonry
                </a>
                <a className="dropdown-item" href="/project-details">
                  Project Details
                </a>
              </div> */}
            </li>
            <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="/stock"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="rolling-text">Stock</span>
              </a>
            </li>
            <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="/blog-classic"
                role="button"
                // aria-haspopup="true"
                // aria-expanded="false"
              >
                <span className="rolling-text">Blogs</span>
              </a>
              {/* <div className="dropdown-menu">
                <a className="dropdown-item" href="/blog-classic">
                  Blog Standerd
                </a>
                <a className="dropdown-item" href="/blog-grid-sidebar">
                  Grid With Sidebar
                </a>
                <a className="dropdown-item" href="/blog-grid-3column">
                  Grid Three Column
                </a>
                <a className="dropdown-item" href="/blog-details">
                  Blog Details
                </a>
              </div> */}
            </li>
            {/* <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a
                className="nav-link"
                data-toggle="dropdown"
                href="/page-about"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="rolling-text">About</span>
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/page-contact">
                <span className="rolling-text">Contact Us</span>
              </a>
            </li>
          </ul>
        </div>
        {userData?.user ? (
          <div className="contact-button" onClick={() => handleLogOut()}>
            <a className="butn butn-sm butn-bg main-colorbg radius-5">
              <span className="text">Logout</span>
            </a>
          </div>
        ) : (
          <div className="contact-button">
            <a
              href="/log-in"
              className="butn butn-sm butn-bg main-colorbg radius-5"
            >
              <span className="text">Sign In</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
