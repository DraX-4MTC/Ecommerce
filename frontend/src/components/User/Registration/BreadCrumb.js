import React from "react";
import { Link } from "react-router-dom";

import breadCrumb from "./bredcumb-1.png";

const backgroundImage = {
  backgroundImage: `url(${breadCrumb})`,
};

const BreadCrumb = () => {
  return (
    <div className="breadcumb-wrapper" style={backgroundImage}>
      <div className="container z-index-common">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title">Registration</h1>
        </div>
        <div className="breadcumb-menu-wrap">
          <ul className="breadcumb-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">Registration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
