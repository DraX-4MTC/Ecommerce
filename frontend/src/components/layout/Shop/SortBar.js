import React from "react";

const SortBar = () => {
  return (
    <div className="vs-sort-bar">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-auto"></div>
        <div className="col-md-auto">
          <div className="row justify-content-center">
            <div className="col-auto">
              <div className="nav" role="tablist">
                <a
                  href="#"
                  className="icon-btn active"
                  id="tab-shop-grid"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-grid"
                  role="tab"
                  aria-controls="tab-grid"
                  aria-selected="true"
                >
                  <i className="fas fa-th"></i>
                </a>
                <a
                  href="#"
                  className="icon-btn"
                  id="tab-shop-list"
                  data-bs-toggle="tab"
                  data-bs-target="#tab-list"
                  role="tab"
                  aria-controls="tab-grid"
                  aria-selected="false"
                >
                  <i className="fas fa-list"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
