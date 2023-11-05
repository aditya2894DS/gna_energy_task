import { useContext, useEffect, useState } from "react";
import TourCardComponent from "./TourCardComponent";
import { AppContext } from "../AppContext";
import Paginate from "./Paginate";

export default function TourResultComponent() {
  const [tourList] = useContext(AppContext);

  // functions used for pagination
  const [currentPage, setCurrentPage] = useState(tourList.paginationNo);
  const [postPerPage] = useState(5);

  const indexOfLastProd = currentPage * postPerPage;
  const indexOfFirstProd = indexOfLastProd - postPerPage;
  const currentProd = tourList.filteredData.slice(
    indexOfFirstProd,
    indexOfLastProd
  );

  function paginate(no) {
    setCurrentPage(no)
  }

  return (
    <>
      <div className="tourresult-component" style={{ flexGrow: 0.7 }}>
        <p
          className="search-result-count-text"
          style={{ fontWeight: "bold", marginLeft: "1em" }}
        >
          {tourList.filteredData.length} tours in {tourList.countrySelected}
        </p>
        {currentProd.map((data) => (
          <TourCardComponent data={data} />
        ))}
      <Paginate
        postPerPage={postPerPage}
        totalPosts={tourList.filteredData.length}
        paginate={paginate}
        /> 
        </div>
    </>
  );
}
