import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";

const Protected = ({ element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  let navigate = useNavigate();
  console.log({ rest });
  return (
    <>
      {loading === false && (
        <Routes>
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return navigate("/logIn");
              }

              return <Element {...props} />;
            }}
          />
        </Routes>
      )}
    </>
  );
};

export default Protected;
