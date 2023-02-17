import React from "react";
import { Link } from "react-router-dom";

const TabContent = ({ products }) => {
  return (
    <div className="tab-content" id="nav-tabContent">
      <div
        className="tab-pane fade active show"
        id="tab-grid"
        role="tabpanel"
        aria-labelledby="tab-shop-grid"
      >
        <div className="row">
          {products &&
            products.map((product) => (
              <div
                className="col-sm-6 col-md-4 col-lg-4 col-xl-3"
                key={product._id}
              >
                <div className="vs-product product_layout4">
                  <div className="product-img">
                    <Link to={`/${product.name}/${product._id}`}>
                      <img src={product.images[0].url} alt="Product" />
                    </Link>
                    <div className="actions">
                      <Link to="/cart" className="icon-btn style2">
                        <i className="fal fa-shopping-bag"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="product-category">
                      <Link to={`/${product.name}/${product._id}`}>
                        {product.category}
                      </Link>
                    </div>
                    <h3 className="product-title">
                      <Link to={`/${product.name}/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product-price">Rs {product.price}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="tab-list"
        role="tabpanel"
        aria-labelledby="tab-shop-list"
      >
        <div className="row">
          {products &&
            products.map((product) => (
              <div className="col-md-6 col-xl-4" key={product._id}>
                <div className="vs-product product_layout12">
                  <div className="product-img">
                    <Link to={`/${product.name}/${product._id}`}>
                      <img src={product.images[0].url} alt="Product" />
                    </Link>
                    <div className="actions">
                      <Link to="cart.html" className="icon-btn style2">
                        <i className="fal fa-shopping-bag"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="product-category">
                      <Link to={`/${product.name}/${product._id}`}>
                        {product.category}
                      </Link>
                    </div>
                    <h3 className="product-title">
                      <Link to={`/${product.name}/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product-price">{product.price}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TabContent;
