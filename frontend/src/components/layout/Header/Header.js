import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";

import { logOut } from "../../../actions/userAction";
import { Backdrop } from "@mui/material";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop/${keyword}`);
    } else {
      navigate("/shop");
    }
  };

  function profile() {
    navigate("/account");
  }

  function orders() {
    navigate("/orders");
  }

  function logout() {
    dispatch(logOut());
    alert.success("Log Out Successfully!!");
    navigate("/logIn");
  }

  const actions = [
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <ListIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Log Out", func: logout },
  ];

  return (
    <header className="vs-header header-layout2">
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <div className="container">
        <div className="menu-top">
          <div className="row align-items-center justify-content-center justify-content-md-between gx-80">
            <div className="col-auto">
              <div className="row gx-50">
                <div className="col-auto">
                  <div className="header-info">
                    <div className="header-info_icon">
                      <img
                        src="/assets/img/icon/call-icon.png"
                        alt="icon"
                      ></img>
                    </div>
                    <div className="media-body">
                      <div className="header-info_link">
                        <a href="tel:+919999244109" className="text-inherit">
                          +91 9999244109
                        </a>
                      </div>
                      <span className="header-info_label">Call Us Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm mt-20 mt-md-0">
              <form
                action="#"
                className="header-form"
                onSubmit={searchSubmitHandler}
              >
                <input
                  type="text"
                  placeholder="Product Search"
                  onChange={(e) => setKeyword(e.target.value)}
                ></input>
                <button type="submit">Search</button>
                <i className="far fa-search" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky-wrapper">
        <div className="sticky-active">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-4 col-sm-auto">
                <div className="header-logo py-4 py-lg-0">
                  <Link to={"/"}>
                    <img src="/assets/img/logo.png" alt="logo icon"></img>
                  </Link>
                </div>
              </div>
              <div className="col-auto ms-md-auto ms-lg-0">
                <nav className="main-menu menu-style2 d-none d-lg-block">
                  <ul>
                    <li className="menu-item-has-children">
                      <Link to={"/categories"}>Categories</Link>
                      <ul className="sub-menu">
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
                    </li>
                    <li>
                      <Link to={"/aboutUs"}>About Us</Link>
                    </li>
                    <li>
                      <Link to={"/contactUs"}>Contact Us</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-auto">
                <div className="header-buttons">
                  {isAuthenticated ? (
                    <SpeedDial
                      ariaLabel="user"
                      className="speedDial"
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      style={{ zIndex: "11" }}
                      open={open}
                      direction="down"
                      icon={
                        <i
                          className="fal fa-user"
                          style={{
                            color: "#000",
                            fontSize: 22,
                          }}
                        ></i>
                      }
                      FabProps={{
                        sx: {
                          backgroundColor: "inherit",
                          "&:hover": {
                            backgroundColor: "inherit",
                          },
                          borderRadius: 0,
                          boxShadow: "none",
                          height: 0,
                          minHeight: "25px",
                        },
                      }}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={action.func}
                          tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                      ))}
                    </SpeedDial>
                  ) : (
                    <Link to={"/logIn"}>
                      <i className="fal fa-user"></i>
                    </Link>
                  )}

                  <div className="header-cart">
                    <Link to={"/cart"} className="has-badge">
                      <i className="fal fa-shopping-bag"></i>
                      <span className="badge">0</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-auto d-block d-lg-none">
                <button className="vs-menu-toggle d-inline-block d-lg-none">
                  <i className="fal fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
