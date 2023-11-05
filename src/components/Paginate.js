import React from "react";
import { useMemo } from "react";
import "../style/Paginate.css";

export default function Paginate({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const myRefs = useMemo(() => { // function for creating arrays of refs for each paginate button
    let myRefs = [] ;
    pageNumbers.forEach((el) => {
      myRefs[el] = React.createRef(null);
    });
    return myRefs;
  }, [pageNumbers]);


  function handleStyle(no) { // function for changing the style of selected paginate button
    myRefs.map((ref) => {
      if (ref.current.innerText !== no) {
        ref.current.classList.remove("paginate-clicked");
      }
    });
    myRefs[no].current.classList.add("paginate-clicked");
  }

  return (
    <>
      <div className="paginate-container">
        <ul className="pagination">
          {pageNumbers.map((no) => (
            <li
              key={no}
              ref={myRefs[no]}
              className="page-no"
              onClick={() => {
                paginate(no);
                handleStyle(no);
              }}
            >
              {no}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
