import React from "react";
import "./AdminFooter.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <img
            src="/assets/imgs/logo-light.png"
            alt="Logo"
            className="footer-logo"
          />
        </div>

        <div className="footer-section">
          <h6>Contact</h6>
          <p>Sham Marianas - Multimedia Creator in Dubai, UAE</p>
          <p>
            <a href="mailto:info@shammarianas.com" className="footer-link">
              info@shammarianas.com
            </a>
          </p>
        </div>

        <div className="footer-section">
          <h6>Useful Links</h6>
          <ul className="footer-links">
            <li>
              <a href="/page-about">About</a>
            </li>
            <li>
              <a href="/page-services">Services</a>
            </li>
            <li>
              <a href="/blog-grid-sidebar">Blog</a>
            </li>
            <li>
              <a href="/page-contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h6>Newsletter</h6>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/shammarianas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@ShamMarianasSM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.behance.net/shammarianas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-behance"></i>
            </a>
            <a
              href="https://www.instagram.com/sham_marianas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.pinterest.com/shammarianas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} All Rights Reserved By Sham Marianas</p>
      </div>
    </footer>
  );
}

export default Footer;
