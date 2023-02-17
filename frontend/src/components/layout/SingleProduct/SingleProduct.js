import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import BreadCrumb from "./BreadCrumb";
import ProductWrapper from "./ProductWrapper";

import { clearErrors, getProductDetails } from "../../../actions/productAction";
import PreLoader from "../Header/PreLoader";
import MetaData from "../MetaData";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <MetaData title={product.name} />
          <BreadCrumb product={product} />
          <ProductWrapper product={product} />
        </>
      )}
    </>
  );
};

export default SingleProduct;
