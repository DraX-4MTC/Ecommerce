import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

const Footer = () => {
  return (
    <footer className="footer-wrapper footer-layout1">
      <div className="widget-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-5 col-lg-3">
              <div className="widget footer-widget">
                <h3 className="widget_title">Contact Us</h3>
                <div className="vs-widget-about">
                  <p className="footer-info">
                    <i className="fas fa-envelope"></i>
                    <a
                      className="text-inherit"
                      href={"mailto:arjunprateek31@gmail.com"}
                    >
                      arjunprateek31@gmail.com
                    </a>
                  </p>
                  <p className="footer-info">
                    <i className="fas fa-phone-alt"></i>
                    <a href={"tel:9999244109"} className="text-inherit">
                      9999244109
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-auto col-md-6 col-lg-auto offset-xl-1">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Categories</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <Link to={"/shop"}>Laptops</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>Smart Phones</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>Watches</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>Head Phones</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>Cameras</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>Desktops</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-auto col-md-6 col-lg-auto">
              <div className="widget widget_nav_menu footer-widget">
                <h3 className="widget_title">Follow us on</h3>
                <div className="menu-all-pages-container">
                  <ul className="menu">
                    <li>
                      <Link to={""}>
                        <FeatherIcon
                          icon="instagram"
                          color="#e1aa5e"
                          size={14}
                        />
                        {"  "}
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link to={""}>
                        <FeatherIcon icon="twitter" color="#e1aa5e" size={14} />
                        {"  "}
                        LinkedIn
                      </Link>
                    </li>
                    <li>
                      <Link to={""}>
                        <FeatherIcon icon="github" color="#e1aa5e" size={14} />
                        {"  "}
                        Github
                      </Link>
                    </li>
                    <li>
                      <Link to={""}>
                        <FeatherIcon
                          icon="facebook"
                          color="#e1aa5e"
                          size={14}
                        />
                        {"  "}
                        Facebook
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap text-center">
        <p className="mb-0">
          <i className="fal fa-copyright"></i> 2022 All rights Reserved by
          Prateek Abbi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
