import React from "react";
import { Link } from "react-router-dom";

import breadCrumb from "./bredcumb-1.png";

const backgroundImage = {
  backgroundImage: `url(${breadCrumb})`,
};

const BreadCrumb = ({ product }) => {
  return (
    <div className="breadcumb-wrapper" style={backgroundImage}>
      <div className="container z-index-common">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title">{product.category}</h1>
        </div>
      </div>
      <div className="breadcumb-menu-wrap">
        <ul className="breadcumb-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="active">{product.category}</li>
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumb;
