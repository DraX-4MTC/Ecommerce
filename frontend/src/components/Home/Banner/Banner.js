import React from "react";

const Banner = () => {
  return (
    <section className="space-top space-extra-bottom">
      <div className="container-lg">
        <div className="row justify-content-between">
          <div className="col-sm-4 col-md-4 col-lg-auto d-flex justify-content-center">
            <div className="feature_media">
              <div className="feature_media_icon">
                <img src="assets/img/icon/feature-2-1.png" alt="feature icon" />
              </div>
              <div className="media-body">
                <h3 className="feature_media_title">Free Shipping</h3>
                <p className="feature_media_text">
                  Free shipping on all orders
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-auto d-flex justify-content-center">
            <div className="feature_media">
              <div className="feature_media_icon">
                <img src="assets/img/icon/feature-2-2.png" alt="feature icon" />
              </div>
              <div className="media-body">
                <h3 className="feature_media_title">Support 24*7</h3>
                <p className="feature_media_text">Contact us any time a day</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-auto d-flex justify-content-center">
            <div className="feature_media">
              <div className="feature_media_icon">
                <img src="assets/img/icon/feature-2-3.png" alt="feature icon" />
              </div>
              <div className="media-body">
                <h3 className="feature_media_title">90 Days Return</h3>
                <p className="feature_media_text">If goods have problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
