import React from "react";
import { useContext, useEffect,  useRef, useState } from "react";
import searchFilterData from "../data/searchFilterData.json";
import "../style/SearchFilter.css";
import { AppContext } from "../AppContext";
 
export default function SearchFilterComponent() {
  const [filterCategories, ] = useState(searchFilterData);

  const [filterStatus, setFilterStatus] = useContext(AppContext);
  const [finalArrLength, setFinalArrLength] = useState([])
  const [myRefs, setMyRefs] = useState({})
  const rangeRef = useRef(null);
  const [currentPrice, setCurrentPrice] = useState(5000);

  function handlePriceRange(e) {
    setFilterStatus({ ...filterStatus, price: e.target.value });
    setCurrentPrice(e.target.value)
  }

  // finding the no. of checkbox filters
  useEffect( () => {
    let len = []
    filterCategories.map(obj =>{
      if(obj.categories){
        obj.categories.forEach(cat => len.push(cat))
        setFinalArrLength(len)
      }
    })
  }, [filterCategories])

  // resetting the filters after changing the courtry
  useEffect(() => {
    let refs = getRefs(finalArrLength)
    setMyRefs(refs)
  }, [finalArrLength, filterStatus.countrySelected])
  
  function getRefs(arr){
    const refs = {};
    arr.forEach(item => {
      refs[item.category] = React.createRef(null)
    })
    return refs;
  }
  
  // handling changes when chaging destination
  useEffect(() => {
    Object.keys(myRefs).forEach(key => myRefs[key].current.checked = false)
    rangeRef.current.value = 5000
    setCurrentPrice(5000)
    
  }, [filterStatus.countrySelected, myRefs])

  // changing context state from the respective filters
  function handleFilterCheck(e) {
    let id = e.target.id;
    let check = e.target.checked;
    switch (id) {
      case "Tours":
        setFilterStatus({
          ...filterStatus,
          category: { tours: check },
        });
        break;
      case "Attractions":
        setFilterStatus({
          ...filterStatus,
          category: { attractions: check },
        });
        break;
      case "Concert & Shows":
        setFilterStatus({
          ...filterStatus,
          category: { cs: check },
        });
        break;
      case "Free cancellation":
        setFilterStatus({
          ...filterStatus,
          freeCancel: check,
        });
        break;
      case "Up to 4 hour":
        setFilterStatus({
          ...filterStatus,
          duration: { upto4hr: check },
        });
        break;
      case "4 to 12 hour":
        setFilterStatus({
          ...filterStatus,
          duration: { upto12hr: check },
        });
        break;
      case "12 hour to 1 day":
        setFilterStatus({
          ...filterStatus,
          duration: { upto24hr: check },
        });
        break;
      default: {
        return;
      }
    }
  }

  return (
    <>
      <div className="searchfilter-container">
        {filterCategories.map((item) => (
          <>
            <div className="searchfilter-box">
              <p className="bold-txt item-label-txt">{item.label}</p>
              {item.categories ? (
                <div className="category-list">
                  {item.categories.map((cat) => (
                    <div key={cat.id} className="subcat-container">
                      <input
                        type="checkbox"
                        ref={myRefs[cat.category]}
                        id={cat.category}
                        onChange={handleFilterCheck}
                      />
                      <p className="cat-txt">{cat.category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="price-range-txt">$0 - ${currentPrice}</p>
                  <input
                    className="price-range"
                    ref={rangeRef}
                    type="range"
                    max="5000"
                    min="0"
                    step="100"
                    value={filterStatus.price}
                    onChange={handlePriceRange}
                  />
                </>
              )}
            </div>
            <hr style={{ width: "90%" }} />
          </>
        ))}
      </div>
    </>
  );
}
