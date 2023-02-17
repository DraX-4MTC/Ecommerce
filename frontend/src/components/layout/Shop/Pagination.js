import React from "react";
import Pagination from "react-js-pagination";
import FeatherIcon from "feather-icons-react";

const Pages = ({
  productCount,
  count,
  resultPerPage,
  setCurrentPageNo,
  currentPage,
}) => {
  return (
    <div className="vs-pagination pt-20 pb-30">
      {resultPerPage < count && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productCount}
          onChange={setCurrentPageNo}
          nextPageText={<FeatherIcon icon={"chevron-right"} />}
          prevPageText={<FeatherIcon icon={"chevron-left"} />}
          firstPageText={<FeatherIcon icon={"chevrons-left"} />}
          lastPageText={<FeatherIcon icon={"chevrons-right"} />}
        />
      )}
    </div>
  );
};

export default Pages;
