import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import BreadCrumb from "./BreadCrumb";
import ProductWrapper from "./ProductWrapper";

import { clearErrors, getProduct } from "../../../actions/productAction";
import PreLoader from "../Header/PreLoader";
import MetaData from "../MetaData";

const Shop = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <MetaData title="Shop" />
          <BreadCrumb />
          <ProductWrapper
            currentPage={currentPage}
            setCurrentPageNo={setCurrentPageNo}
            productCount={productCount}
            count={count}
            resultPerPage={resultPerPage}
            products={products}
            price={price}
            priceHandler={priceHandler}
            setCategory={setCategory}
            ratings={ratings}
            setRatings={setRatings}
          />
        </>
      )}
    </>
  );
};

export default Shop;
