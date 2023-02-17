import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router";
//import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { useAlert } from "react-alert";

import PreLoader from "../../layout/Header/PreLoader";
import MetaData from "../../layout/MetaData";

import BreadCrumb from "./BreadCrumb";
import Profile from "./Profile";

const Account = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <MetaData title={user.name} />
          <BreadCrumb user={user} />
          <Profile user={user} />
        </>
      )}
    </>
  );
};

export default Account;
