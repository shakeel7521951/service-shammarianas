'use client';
import React, { useEffect } from 'react';

import loadBackgroudImages from '../../common/loadBackgroudImages';
function Header() {
  useEffect(() => {
    loadBackgroudImages();
  }, []);
  return (
    <header
      className="page-header bg-img section-padding valign"
      data-background="/assets/imgs/background/bg4.jpg"
      data-overlay-dark="8"
    >
      <div className="container pt-80">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1 className="text-u ls1 fz-80">
                <span className='main-color'>Purchased </span>{" "} Items
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
