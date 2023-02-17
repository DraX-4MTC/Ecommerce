import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LockResetIcon from "@mui/icons-material/LockReset";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";

const Profile = ({ user }) => {
  const dipatch = useDispatch();
  const alert = useAlert();

  return (
    <section className="bg-white space-top space-extra-bottom">
      <div className="container">
        <div className="row">
          <div>
            <Typography variant="h4" style={{ padding: "0 0 10px 0" }}>
              Basic Details
              <Typography variant="subtitle2">
                (You can not change your email address)
              </Typography>
            </Typography>
          </div>

          <div className="">
            <div
              className="row vs-carousel"
              data-slide-show="3"
              data-sm-slide-show="2"
              data-xs-slide-show="1"
              data-rows="2"
              id="catSlide1"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <div className="row justify-content-between align-items-center">
                <form
                  action="#"
                  className="default-form"
                  encType="multipart/form-data"
                >
                  <div style={{ paddingLeft: "100px" }}>
                    <div
                      //className="col-lg-3 col-md-3 col-12 order-sm-9 order-xs-9 order-12 order-lg-0 order-md-0 userImage"
                      className="userImage"
                      style={{ marginBottom: "35px" }}
                    >
                      <img
                        src={user.avatar.url}
                        alt={user.name}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 50,
                        }}
                      ></img>
                    </div>
                    <div className="col-12 form-group">
                      <MailIcon
                        style={{ position: "absolute", margin: "17px" }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Email"
                        value={user.username}
                      />
                    </div>
                    <div className="col-12 form-group">
                      <PersonIcon
                        style={{ position: "absolute", margin: "17px" }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={user.name}
                        //onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 form-group">
                    <Typography
                      variant="h4"
                      style={{ padding: "20px 0 10px 0" }}
                    >
                      Your Profile Picture
                    </Typography>
                    <input
                      style={{ padding: "18px 30px" }}
                      type="file"
                      className="form-control"
                      name="avatar"
                      accept="image/*"
                      //onChange={dataChange}
                    />
                  </div>

                  <div className="col-lg-3 col-md-3 col-12 form-group">
                    <button type="submit" className="vs-btn style4">
                      Save Changes
                    </button>
                  </div>
                </form>

                <div className="" style={{ paddingTop: "80px" }}>
                  <Typography variant="h4" style={{ padding: "20px 0 10px 0" }}>
                    Reset your Password
                  </Typography>
                </div>
                <form style={{ marginBottom: 20 }} className="default-form">
                  <div className="col-12 form-group">
                    <LockIcon
                      style={{ position: "absolute", margin: "17px" }}
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      //value={password}
                      //onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/*{password && (
                  <div
                    className="col-12 form-group form-control"
                    style={{
                      height: "50px",
                    }}
                  >
                    {password}
                  </div>
                  )}*/}
                  </div>
                  <div className="col-12 form-group">
                    <LockResetIcon
                      style={{ position: "absolute", margin: "17px" }}
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-type your password"
                      //value={password}
                      //onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/*{password && (
                  <div
                    className="col-12 form-group form-control"
                    style={{
                      height: "50px",
                    }}
                  >
                    {password}
                  </div>
                  )}*/}
                  </div>
                  <div className="col-lg-3 col-md-3 col-12 form-group">
                    <button type="submit" className="vs-btn style4">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
