import React from 'react';

function Contact() {
  return (
    <section className="contact section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 valign">
            <div className="sec-head info-box full-width md-mb80">
              {/* <div className="phone fz-30 fw-600 underline main-color">
                <a href="#0">+1 840 841 25 69</a>
              </div> */}
              <div className="morinfo mt-50 pb-30 bord-thin-bottom">
                <h6 className="mb-15">Address</h6>
                <p><span className='main-color'>Sham Marianas</span> - Multimedia Creator in Dubai, United Arab Emirates  </p>
              </div>
              <div className="morinfo mt-30 pb-30 bord-thin-bottom">
                <h6 className="mb-15">Email</h6>
                <p>info@shammarianas.com</p>
              </div>

              <div className="social-icon mt-50">
                <a href="https://www.facebook.com/shammarianas" target='_blank' rel="noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.youtube.com/@ShamMarianasSM" target='_blank' rel="noreferrer">
                <i class="fab fa-youtube"></i>
                </a>
                <a href="https://www.behance.net/shammarianas" target='_blank' rel="noreferrer">
                <i class="fab fa-behance"></i>
                </a>
                <a href="https://www.instagram.com/sham_marianas" target='_blank' rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.pinterest.com/shammarianas" target='_blank' rel="noreferrer"> 
                <i class="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-7 offset-lg-1 valign">
            <div className="full-width">
              <div className="sec-head mb-50">
                <h6 className="sub-title main-color mb-15">Let&lsquo;s Chat</h6>
                <h3 className="text-u ls1">
                  Send a <span className="fw-200">message</span>
                </h3>
              </div>
              <form
                id="contact-form"
                className="form2"
                method="post"
                action="contact.php"
              >
                <div className="messages"></div>

                <div className="controls row">
                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required="required"
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required="required"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group mb-30">
                      <input
                        id="form_subject"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        name="message"
                        placeholder="Message"
                        rows="4"
                        required="required"
                      ></textarea>
                    </div>
                    <div className="mt-30">
                      <button
                        type="submit"
                        className="butn butn-full butn-bord radius-30"
                      >
                        <span className="text">Let&lsquo;s Talk</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
