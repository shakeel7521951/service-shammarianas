"use client";
import React, { useEffect, useState, useRef } from "react";
import companyLogo from "../../../src/assets/companyLogo.png";
import { useGetUserQuery, useSignOutMutation } from "../../features/usersApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { FaCartPlus } from "react-icons/fa";
// import { FaRegAddressCard } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { data: userData } = useGetUserQuery();
  const [signOut] = useSignOutMutation();
  const [showDropDown, setShowDropDown] = useState(false);

  const dropdownMenuRef = useRef(null);
  const navbarCollapseRef = useRef(null);

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleLogOut = async () => {
    try {
      await signOut();
      window.location.reload();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  function handleDropdownMouseMove(event) {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.add("show");
    }
  }

  function handleDropdownMouseLeave(event) {
    if (dropdownMenuRef.current) {
      dropdownMenuRef.current.classList.remove("show");
    }
  }

  const handleNavigateToDashboard = () => {
    navigate("/admin/dashboard");
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

  function handleToggleNav() {
    if (navbarCollapseRef.current) {
      navbarCollapseRef.current.classList.toggle("show");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bord blur">
      <ToastContainer />

      <div className="container o-hidden">
        <a className="logo icon-img-100" href="/">
          <img src={companyLogo} alt="logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleNav}
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div
          ref={navbarCollapseRef}
          className="collapse navbar-collapse justify-content-center"
        >
          <ul className="navbar-nav">
            <li
              onMouseLeave={handleDropdownMouseLeave}
              onMouseMove={handleDropdownMouseMove}
              className="nav-item dropdown"
            >
              <a className="nav-link dropdown-toggle" href="/">
                <span className="rolling-text">Home</span>
              </a>
              <ul ref={dropdownMenuRef} className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/page-about">
                    About Us
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">
                <span className="rolling-text">Services</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/portfolio">
                <span className="rolling-text">Portfolio</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/stock">
                <span className="rolling-text">Stock</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog-classic">
                <span className="rolling-text">Blogs</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/page-contact">
                <span className="rolling-text">Contact Us</span>
              </a>
            </li>
          </ul>
        </div>

        {userData?.user ? (
          <>
            <div
              className="contact-button"
              onClick={() => (window.location.href = "/cart-data")}
            >
              <a className="butn butn-sm d-flex justify-content-center cursor-pointer align-items-center">
                {/* <FaCartPlus style={{ fontSize: "35px" }} /> */}
              </a>
            </div>
            <div
              className="contact-button position-relative"
              onClick={handleDropDown}
            >
              <a
                className="butn butn-sm butn-bg main-colorbg d-flex justify-content-center cursor-pointer align-items-center"
                style={{ width: "40px", height: "40px", borderRadius: "100%" }}
              >
                {userData?.user?.fullName.charAt(0).toUpperCase()}
              </a>
            </div>

            {showDropDown && (
              <div className="profileDropDown position-absolute show mt-3">
                <ul>
                  {userData?.user?.role === "admin" && (
                    <li className="pb-2">
                      <a onClick={handleNavigateToDashboard}>
                        {/* <FaRegAddressCard
                          className=" me-2"
                          style={{ fontSize: "30px" }}
                        />{" "}Dashboard */}
                        {/* Increased icon size Dashboard */}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      onClick={() =>
                        (window.location.href = "/purchased-items")
                      }
                    >
                      <i className="fas fa-history"></i> History
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogOut}>
                      <i className="fas fa-sign-out-alt"></i> Log Out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </>
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
