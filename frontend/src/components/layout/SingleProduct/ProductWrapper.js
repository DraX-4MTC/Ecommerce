import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import FeatherIcons from "feather-icons-react";

import CustomerReview from "./CustomerReview";

const ProductWrapper = ({ product }) => {
  var options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "rgba(225, 172, 108, 1)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <section className="vs-product-wrapper product-details space-top">
      <div className="container">
        <div className="row gx-40">
          <div className="col-lg-6">
            <div className="product-details-img product-img">
              <div className="product-big-slide">
                <div>
                  <div className="img">
                    <Carousel>
                      {product.images &&
                        product.images.map((item, i) => (
                          <img
                            className="CarouselImage"
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        ))}
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-about">
              <p className="price">Rs {product.price}</p>
              <h2 className="product-title">
                <Link to="">{product.name}</Link>
              </h2>
              <div className="product-rating">
                <div className="review-rating-average">
                  {product.ratings}.00
                </div>
                <div>
                  <ReactStars {...options} />
                </div>
                <a href="#reviews" className="woocommerce-review-link">
                  {product.numOfReviews < 1 ? (
                    <span className="count">
                      {product.numOfReviews} Customer Reviews
                    </span>
                  ) : (
                    <span className="count">
                      {product.numOfReviews} Customer Review
                    </span>
                  )}
                </a>
              </div>
              <div className="product-info-list">
                <ul>
                  <li>
                    <FeatherIcons
                      icon={"refresh-cw"}
                      size="14px"
                      color="#e1aa5e"
                    />
                    {"\t"}
                    30 Day Return Policy
                  </li>
                  <li>
                    <FeatherIcons
                      icon={"dollar-sign"}
                      size="14px"
                      color="#e1aa5e"
                    />
                    {"\t"}Cash on Delivery available
                  </li>
                  {product.stock < 1 ? (
                    <li>
                      <FeatherIcons
                        icon={"thumbs-down"}
                        size="14px"
                        color="#e1aa5e"
                      />
                      {"\t"}Stock Not Available
                    </li>
                  ) : (
                    <li>
                      <FeatherIcons
                        icon={"thumbs-up"}
                        size="14px"
                        color="#e1aa5e"
                      />
                      {"\t"}
                      Stock Available
                    </li>
                  )}
                </ul>
              </div>

              <div className="quantity style3">
                <label className="screen-reader-text" htmlFor="product007">
                  Quantity
                </label>
                <button className="quantity-minus qut-btn">
                  <i className="far fa-minus"></i>
                </button>
                {/*<input
                  type="number"
                  id="product007"
                  className="qty-input"
                  step="1"
                  min="1"
                  max="100"
                  name="quantity"
                  value="1"
                  title="Qty"
                />*/}
                <button className="quantity-plus qut-btn">
                  <i className="far fa-plus"></i>
                </button>
              </div>
              <div className="actions">
                <button type="submit" className="vs-btn style2">
                  Add to cart
                </button>
              </div>
              <div
                className="product-accordion accordion"
                id="productAccordion"
              >
                <div className="accordion-item">
                  <div className="accordion-header" id="accordionOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Product Details
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="accordionOne"
                    data-bs-parent="#productAccordion"
                  >
                    <div className="accordion-body">
                      <p className="text">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative">
        <CustomerReview product={product} />
      </div>
    </section>
  );
};

export default ProductWrapper;
