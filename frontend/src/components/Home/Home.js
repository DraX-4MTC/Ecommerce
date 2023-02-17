import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import FeatureProducts from "./FeatureProducts/FeatureProducts";
import Banner from "./Banner/Banner";

import MetaData from "../layout/MetaData";

import { clearErrors, getProduct } from "../../actions/productAction";
import PreLoader from "../layout/Header/PreLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <MetaData title="E-Commerce" />
          <FeatureProducts products={products} />
          <Banner />
        </>
      )}
    </>
  );
};

export default Home;
