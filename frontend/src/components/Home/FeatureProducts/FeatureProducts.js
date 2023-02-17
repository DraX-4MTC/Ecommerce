import React from "react";

import Products from "./Products";

const FeatureProducts = ({ products }) => {
  return (
    <section className="bg-secondary space-top space-extra-bottom">
      <div className="container">
        <div className="title-area">
          <div className="row justify-content-between align-items-center text-center text-md-start">
            <div className="col-md-auto">
              <h2 className="sec-title">Featured Products</h2>
              <p className="sec-title mb-0">
                Our campaigns, the latest trends and new collections
              </p>
            </div>
          </div>
        </div>
        <div
          className="row vs-carousel"
          data-slide-show="3"
          data-sm-slide-show="2"
          data-xs-slide-show="1"
          data-rows="2"
          id="catSlide1"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {products &&
            products.map((product) => (
              <Products products={product} key={product._id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
