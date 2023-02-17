import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const CustomerReview = ({ product }) => {
  var options = {
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "rgba(225, 172, 108, 1)",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <div className="product-details-inner">
      <div className="bg-shape">
        <img src="/assets/img/product/p-d-shape-1.png" alt="shape"></img>
      </div>
      <div className="bg-shape2">
        <img src="/assets/img/product/p-d-shape-2.png" alt="shape" />
      </div>
      <div className="container">
        <ul className="nav product-tab-style1" id="productTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link active"
              id="reviews-tab"
              data-bs-toggle="tab"
              to="#reviews"
              role="tab"
              aria-controls="reviews"
              aria-selected="false"
            >
              Customer Reviews
            </Link>
          </li>
        </ul>
        <div className="row gx-40">
          <div className="col-lg-4">
            <div className="reviews-summary">
              <div className="reviews-summary__top">
                <div className="reviews-summary__average">
                  {product.ratings}
                </div>
                <div className="reviews-summary__rating">
                  <div>
                    <ReactStars
                      {...options}
                      edit={false}
                      value={product.ratings}
                    />
                  </div>
                </div>
                <div className="reviews-summary__count">
                  {product.numOfReviews < 1 ? (
                    <span className="count">
                      {product.numOfReviews} Customer Reviews
                    </span>
                  ) : (
                    <span className="count">
                      {product.numOfReviews} Customer Review
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="tab-content" id="productTabContent">
              <div
                className="tab-pane show active"
                id="reviews"
                role="tabpanel"
                aria-labelledby="reviews-tab"
              >
                <div className="product-reviews">
                  <div className="reviews-note">
                    Only logged in customers who have purchased this product may
                    leave a review.
                  </div>
                  <form action="#" className="" id="review_form">
                    <div
                      id="respond"
                      className="comment-respond"
                      style={{ marginLeft: "0px" }}
                    >
                      <div className="row gx-20">
                        <div className="col-12">
                          <div className="form-group rating-select">
                            <label>Your Rating</label>
                            <div className="stars">
                              <ReactStars {...options} edit={true} />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 form-group">
                          <input
                            type="text"
                            placeholder="Review Title"
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 form-group">
                          <textarea
                            placeholder="Write a Review"
                            className="form-control"
                          ></textarea>
                        </div>
                        <div className="col-12 form-group">
                          <button className="vs-btn style7">
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <h3 className="reviews-title">
                    {product.numOfReviews < 1 ? (
                      <span className="count">
                        {product.numOfReviews} Customer Reviews
                      </span>
                    ) : (
                      <span className="count">
                        {product.numOfReviews} Customer Review
                      </span>
                    )}
                  </h3>
                  <div className="vs-review">
                    <div className="vs-review__top">
                      <div>
                        <ReactStars
                          {...options}
                          edit={false}
                          value={product.ratings}
                        />
                      </div>
                    </div>
                    {product.reviews &&
                      product.reviews.map((review, r) => (
                        <>
                          <div
                            className="vs-review__author"
                            style={{
                              backgroundColor: "#e8e8e8",
                              width: "fit-content",
                              padding: "17.5px",
                            }}
                          >
                            <div className="media-body">
                              <h4 className="vs-review__name">{`${r + 1}. ${
                                review.name
                              }`}</h4>
                              <br />
                              <h4 className="vs-review__title">
                                {review.reviewTitle}
                              </h4>
                              <p className="vs-review__text">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane"
                id="question"
                role="tabpanel"
                aria-labelledby="question-tab"
              >
                <form action="#" className="question-form" id="question_form">
                  <div id="rdespond" className="comment-respond">
                    <div className="row gx-20">
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          placeholder="Enter Your Name*"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <input
                          type="email"
                          placeholder="Enter Your Email*"
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 form-group">
                        <textarea
                          placeholder="Write your question*"
                          className="form-control"
                        ></textarea>
                      </div>
                      <div className="col-12 form-group">
                        <button className="vs-btn style7">Post Comment</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
