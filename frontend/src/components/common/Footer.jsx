import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="clean-footer crev">
      <div className="container pb-40 pt-40 ontop">
        <div className="row justify-content-between">
          <div className="col-lg-2">
            <div className="logo icon-img-100 md-mb80">
              <img src="/assets/imgs/logo-light.png" alt="" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="column md-mb50">
              <h6 className="sub-title mb-30">Contact</h6>
              <h6 className="p-color fw-400">
                 Sham Marianas - Multimedia Creator in Dubai, United Arab Emirates              </h6>
              <h6 className="mt-30 mb-15">
                <Link href="#0" className='main-color'>info@shammarianas.com</Link>
              </h6>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="column md-mb50">
              <h6 className="sub-title mb-30">Useful Links</h6>
              <ul className="rest fz-14 opacity-7">
                <li className="mb-15">
                  <a href="/page-about">About</a>
                </li>
                <li className="mb-15">
                  <a href="/page-services">Services</a>
                </li>
                <li className="mb-15">
                  <a href="/blog-grid-sidebar">Blog</a>
                </li>
                <li>
                  <a href="/page-contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="column subscribe-minimal">
              <h6 className="sub-title mb-30">Newsletter</h6>
              <div className="form-group mb-40">
                <input type="text" name="subscrib" placeholder="Your Email" />
                <button>
                  <span className="ti-location-arrow"></span>
                </button>
              </div>
              <ul className="rest social-icon d-flex align-items-center">
                <li className="hover-this cursor-pointer">
                  <a href="https://www.facebook.com/shammarianas" target='_blank' className="hover-anim">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="hover-this cursor-pointer ml-10">
                  <a href="https://www.youtube.com/@ShamMarianasSM" target='_blank' className="hover-anim">
                  <i class="fab fa-youtube"></i>
                  </a>
                </li>
                <li className="hover-this cursor-pointer ml-10">
                  <a href="https://www.behance.net/shammarianas" target='_blank' className="hover-anim">
                  <i class="fab fa-behance"></i>
                  </a>
                </li>
                <li className="hover-this cursor-pointer ml-10">
                  <a href="https://www.instagram.com/sham_marianas" target='_blank' className="hover-anim">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="hover-this cursor-pointer ml-10">
                  <Link to="https://www.pinterest.com/shammarianas" target='_blank' className="hover-anim">
                  <i class="fab fa-pinterest"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-30 pb-30 mt-80 bord-thin-top">
          <div className="text-center">
            <p className="fz-14">
              © {new Date().getFullYear()} All Rights Reserved By <span className='main-color'>Sham Marians</span>
            </p>
          </div>
        </div>
      </div>
      <div className="circle-blur">
        <img src="/assets/imgs/patterns/blur1.png" alt="" />
      </div>
    </footer>
  );
}

export default Footer;
