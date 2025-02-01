'use client';
import React, { useEffect } from 'react';

import loadBackgroudImages from '../../common/loadBackgroudImages';
function Header() {
  useEffect(() => {
    loadBackgroudImages();
  }, []);
  return (
    <header
      className=" main-header bg-img valign"
      data-background="/assets/imgs/background/bg5.jpg"
      data-overlay-dark="7"
    >
      <div className="container ontop">
        <div className="row">
          <div className="col-lg-11">
            <div className="caption">
              <h2 style={{fontSize:"4rem"}}><span className='main-color'>Empowering</span> your
              </h2>
              <div className="d-flex align-items-end">
                <div>
                  <h2 style={{fontSize:'4rem'}} className="nowrap">
                   brand to stand out.
                  </h2>
                </div>
                <div>
                  <div className="text ml-30">
                    {/* <p>
                      We back the founders of new forms of network, digital
                      organisations that harness the{' '}
                      <span className="text-light fw-600">
                        talents of individuals
                      </span>{' '}
                      for the benefit of the collective.
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-80">
          <div className="col-lg-6 order-md-2">
            <div className="icon-img">
              <img src="/assets/imgs/icon-img/arrow-down-big.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-end order-md-1">
            <div className="info">
              <h2 className="mb-10">6k +</h2>
              <h6>
                Projects completed <br />
                <span className="main-color">successfully</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
