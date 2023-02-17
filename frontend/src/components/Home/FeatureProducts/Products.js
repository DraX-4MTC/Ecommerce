import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Products = ({ products }) => {
  var options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "rgba(225, 172, 108, 1)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: products.ratings,
    isHalf: true,
  };
  return (
    <div className="col-md-6 col-lg-4" style={{ flex: 1 }}>
      <div className="cat_chart">
        <div className="cat_chart_img">
          <img
            src={products.images[0].url}
            alt="Category portray"
            style={{ minWidth: "117.5px" }}
          />
        </div>
        {window.innerWidth < 600 ? <br /> : null}

        <div className="media-body">
          <h3 className="cat_chart_title">
            <Link to={`${products.name}/${products._id}`}>{products.name}</Link>
          </h3>
          <ul className="cat_chart_list">
            {window.innerWidth < 767.2 ? (
              <li>{products.numOfReviews} Reviews</li>
            ) : (
              <li>
                <ReactStars {...options} />
              </li>
            )}

            <li>
              <Link to={"/shop"}>{products.category}</Link>
            </li>
            <li>{`Rs ${products.price}`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Products;
