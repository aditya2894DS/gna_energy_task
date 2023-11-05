import DatePicker from "react-datepicker";
import { useContext, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import "../style/Banner.css";
import { AppContext } from "../AppContext";

function CounterComponent({ label }) {
  const [count, setCount] = useState(0);
  
  function increment() { // This increments the passenger count
    setCount(count + 1);
  }

  function decrement() { // This decrements the passenger count
    if (count > 0) {
      setCount(count - 1);
    } else setCount(0);
  }

  return (
    <>
      <div className="counter-container flex-row align-center">
        <p className="bold-txt counter-label">{label}</p>
        <div className="counter flex-row align-center">
          {/* Button for incrementing passenger count */}
          <button onClick={decrement} className="counter-button-dec"></button> 

          <input type="text" className="count-input" value={count} />

          {/* Button for decrmenting passenger count */}
          <button onClick={increment} className="counter-button-inc"></button>
        </div>
      </div>
    </>
  );
}

export default function BannerComponent() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectCountry, ] = useContext(AppContext);
  
  return (
    <>
      <div className="banner-container">
        <h1>Tours in {selectCountry.countrySelected}</h1>
        <div className="tourform-container flex-row">
          <div className="date-container">
            <p className="bold-txt date-label">Start date</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="date-container">
            <p className="bold-txt date-label">End date</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="passenger-container">
            <div className="adult-count">
              <CounterComponent label="Adult(s)" />
              <CounterComponent label="Children" />
            </div>
          </div>
          <button
            className="search-submit-btn"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}
