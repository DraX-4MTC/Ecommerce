import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";

import { clearErrors, register } from "../../../actions/userAction";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const { name, username, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");

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

  const submitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("username", username);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));

    console.log("submited");
  };

  const dataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <form
              action="#"
              className="default-form"
              encType="multipart/form-data"
              onSubmit={submitHandler}
            >
              <h3 className="form-title">Register</h3>
              <p className="form-text">
                Already have an account? <Link to="/logIn">Log in</Link>
              </p>
              <div className="row justify-content-between align-items-center">
                <div className="col-12 form-group">
                  <PersonIcon
                    style={{ position: "absolute", margin: "17px" }}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    name="name"
                    value={name}
                    onChange={dataChange}
                  />
                </div>
                <div className="col-12 form-group">
                  <MailIcon style={{ position: "absolute", margin: "17px" }} />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    name="username"
                    value={username}
                    onChange={dataChange}
                  />
                </div>
                <div className="col-12 form-group">
                  <input
                    style={{ padding: "18px 30px" }}
                    type="file"
                    className="form-control"
                    name="avatar"
                    accept="image/*"
                    onChange={dataChange}
                  />
                </div>

                <div className="col-12 form-group">
                  <LockIcon style={{ position: "absolute", margin: "17px" }} />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={dataChange}
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

                <div className="col-12 form-group">
                  <button type="submit" className="vs-btn style4">
                    Sign Up
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

export default RegisterForm;
