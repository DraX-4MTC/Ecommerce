import React from "react";

const PreLoader = () => {
  return (
    <div className="preloader">
      <div className="preloader-inner">
        <img src="/assets/img/logo.png" alt="Vendora" />
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default PreLoader;
