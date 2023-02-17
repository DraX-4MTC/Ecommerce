import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";

import { clearErrors, login } from "../../../actions/userAction";

const LogInForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const logInSubmit = (e) => {
    console.log("SUbmitted");
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <form action="#" className="default-form" onSubmit={logInSubmit}>
              <h3 className="form-title">Login</h3>
              <p className="form-text">
                Don't have an account yet?{" "}
                <Link to="/register">Sign up for free</Link>
              </p>
              <div className="row justify-content-between align-items-center">
                <div className="col-12 form-group">
                  <MailIcon style={{ position: "absolute", margin: "17px" }} />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 form-group">
                  <LockIcon style={{ position: "absolute", margin: "17px" }} />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {password && (
                    <div
                      className="col-12 form-group form-control"
                      style={{
                        height: "50px",
                      }}
                    >
                      {password}
                    </div>
                  )}
                </div>
                <div className="col-sm-auto form-group">
                  <div className="custom-checkbox">
                    <input type="checkbox" id="remembermylogin" />
                    <label htmlFor="remembermylogin">Remember Me</label>
                  </div>
                </div>
                <div className="col-sm-auto form-group">
                  <p className="form-link">
                    <a href="#">Forget password?</a>
                  </p>
                </div>
                <div className="col-12 form-group">
                  <button type="submit" className="vs-btn style4">
                    Log In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogInForm;
