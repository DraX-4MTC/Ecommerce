import React from "react";

import TabContent from "./TabContent";
import Pages from "./Pagination";
import SideBar from "./SideBar";
import SortBar from "./SortBar.js";

const ProductWrapper = ({
  products,
  productCount,
  resultPerPage,
  setCurrentPageNo,
  currentPage,
  price,
  priceHandler,
  count,
  setCategory,
  ratings,
  setRatings,
}) => {
  return (
    <section className="vs-product-wrapper space-extra">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-3 col-md-3 col-12 order-sm-9 order-xs-9 order-12 order-lg-0 order-md-0"
            style={{ marginBottom: "35px" }}
          >
            <SideBar
              price={price}
              priceHandler={priceHandler}
              setCategory={setCategory}
              ratings={ratings}
              setRatings={setRatings}
            />
          </div>
          <br />
          <div className="col-lg-9 col-md-9 col-12">
            <SortBar />
            <TabContent products={products} />
            <Pages
              productCount={productCount}
              count={count}
              resultPerPage={resultPerPage}
              setCurrentPageNo={setCurrentPageNo}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductWrapper;
