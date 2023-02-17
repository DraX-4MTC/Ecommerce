import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const MobileHeader = () => {
  return (
    <div className="vs-menu-wrapper">
      <div className="vs-menu-area text-center">
        <button className="vs-menu-toggle">
          <FeatherIcon icon={"x"} />
        </button>
        <div className="mobile-logo">
          <Link to={"/"}>
            <img src="/assets/img/logo-mobile.png"></img>
          </Link>
        </div>
        <div className="vs-mobile-menu">
          <ul>
            <li className="menu-item-has-children">
              <Link to={"/categories"}>Categories</Link>
              <ul className="sub-menu">
                <li>
                  <Link to={"/laptops"}>Laptops</Link>
                </li>
                <li>
                  <Link to={"/phones"}>Smart Phones</Link>
                </li>
                <li>
                  <Link to={"/Watches"}>Watches</Link>
                </li>
                <li>
                  <Link to={"/headsets"}>Head Phones</Link>
                </li>
                <li>
                  <Link to={"/camera"}>Cameras</Link>
                </li>
                <li>
                  <Link to={"/desktops"}>Desktops</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/aboutUs"}>About Us</Link>
            </li>
            <li>
              <Link to={"/contactUs"}>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
