import { useEffect, useRef, useState } from "react";
import "./App.css";

import { getMinMax2 } from "./helper/getMinMax2";
import { searchStateOp } from "./helper/searchStateOp";
import Header from "./components/Header";
import headerCategories from "./data/headerCategories.json";
import BannerComponent from "./components/BannerComponent";
import SearchFilterComponent from "./components/SearchFilterComponent";
import { AppContext } from "./AppContext";
import TourResultComponent from "./components/TourResultComponent";
import Footer from "./components/Footer";

function App() {
  const [appState, setAppState] = useState({
    openModal: false,
    countrySelected: "India",
    filteredData: [],
    globalRefData: [],
    category: {
      tours: false,
      attractions: false,
      cs: false,
    },
    freeCancel: false,
    price: 5000,
    duration: {
      upto4hr: false,
      upto12hr: false,
      upto24hr: false,
    },
    resetFilters: false,
    searchFiltersState: {
      durationState: [],
      freeCancelState: [],
      categoryState: [],
      priceState: [],
    },
    paginationNo: 1,
    allData: [],
  });

  const [modalDialog, setModalDialog] = useState(true);

  const conditionArr = useRef([]);
  const conditionArr2 = useRef([]);

  const resultRef = useRef([]);

  function handleRegister() {
    setModalDialog(false);
  }

  function handleLogin() {
    setModalDialog(true);
  }

  useEffect(() => {
    fetch("./tourData.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        let list = json.filter(
          (obj) => obj.country === appState.countrySelected
        );
        setAppState({
          ...appState,
          allData: json,
          filteredData: list,
          globalRefData: list,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // running different functions when keys of global state are changed
  useEffect(() => checkList(), [appState.countrySelected]); // running function on changing destinations

  useEffect(() => checkDurationFilter(), [appState.duration]); // running function on changing duration

  useEffect(() => changeCategoryFilter(), [appState.category]); // running function on changing category

  useEffect(() => changeFreeCancelFilter(), [appState.freeCancel]); // running function on changing free cancellation

  useEffect(() => changePriceFilter(), [appState.price]); // running function on changing price

  // starting the filter function
  useEffect(() => {
    let result = searchStateOp(
      appState.searchFiltersState,
      appState.globalRefData
    );

    resultRef.current = result;
  }, [appState.searchFiltersState, appState.globalRefData]);

  useEffect(
    () =>
      setAppState({
        ...appState,
        filteredData: resultRef.current,
        paginationNo: 1,
        resetFilters: false
      }),
    [appState.searchFiltersState]
  );

  // function to change destination
  const checkList = () => {
    let list = appState.allData.filter(
      (obj) => obj.country === appState.countrySelected
    );
   
    setAppState({
      ...appState,
      filteredData: list,
      globalRefData: list,
      resetFilters: true
    });
  };

  // function for changin duration filter
  const checkDurationFilter = () => {
    let obj1 = { min: 0, max: 4 };
    let obj2 = { min: 4, max: 12 };
    let obj3 = { min: 12, max: 24 };

    if (appState.duration.upto4hr) {
      conditionArr.current.push(obj1);
    }

    if (appState.duration.upto12hr) {
      conditionArr.current.push(obj2);
    }

    if (appState.duration.upto24hr) {
      conditionArr.current.push(obj3);
    }

    if (conditionArr.current.length > 0) {
      if (appState.duration.upto4hr === false) {
        let myList = conditionArr.current.filter((obj) => obj.min !== obj1.min);
        conditionArr.current = myList;
      } else if (appState.duration.upto12hr === false) {
        let myList = conditionArr.current.filter((obj) => obj.min !== obj2.min);
        conditionArr.current = myList;
      } else if (appState.duration.upto24hr === false) {
        let myList = conditionArr.current.filter((obj) => obj.min !== obj3.min);
        conditionArr.current = myList;
      }
    }

    let durationFinalArr = getMinMax2(
      conditionArr.current,
      appState.globalRefData
    );
    setAppState({
      ...appState,
      searchFiltersState: {
        ...appState.searchFiltersState,
        durationState: durationFinalArr,
      },
    });
  };

  // function for changing category
  const changeCategoryFilter = () => {
    let myList = [];

    if (appState.category.tours) {
      conditionArr2.current.push("Tour");
    } else if (appState.category.tours === false) {
      let r_list = conditionArr2.current.filter((key) => key !== "Tour");
      conditionArr2.current = r_list;
    }

    if (appState.category.attractions) {
      conditionArr2.current.push("Attraction");
    } else if (appState.category.attractions === false) {
      let r_list = conditionArr2.current.filter((key) => key !== "Attraction");
      conditionArr2.current = r_list;
    }

    if (appState.category.cs) {
      conditionArr2.current.push("C&S");
    } else if (appState.category.cs === false) {
      let r_list = conditionArr2.current.filter((key) => key !== "C&S");
      conditionArr2.current = r_list;
    }

    if (conditionArr2.current.length !== 0) {
      conditionArr2.current.map((key) => {
        appState.globalRefData.map((obj) => {
          if (obj.category === key) {
            myList.push(obj);
          }
        });
      });
    } else {
      myList = appState.globalRefData;
    }

    setAppState({
      ...appState,
      searchFiltersState: {
        ...appState.searchFiltersState,
        categoryState: myList,
      },
    });
  };

  // function for changing free cancellation
  const changeFreeCancelFilter = () => {
    let allFreeCancelArr = appState.globalRefData.filter(
      (obj) => obj.freeCancel === true
    );

    if (appState.freeCancel) {
      setAppState({
        ...appState,
        searchFiltersState: {
          ...appState.searchFiltersState,
          freeCancelState: allFreeCancelArr,
        },
      });
    } else {
      setAppState({
        ...appState,
        searchFiltersState: {
          ...appState.searchFiltersState,
          freeCancelState: [],
        },
      });
    }
  };

  // function for changing price
  const changePriceFilter = () => {
    let allPriceArr = appState.globalRefData.filter(
      (obj) => obj.price <= appState.price
    );

    setAppState({
      ...appState,
      searchFiltersState: {
        ...appState.searchFiltersState,
        priceState: allPriceArr,
      },
    });
  };

  return (
    <div className="App">
      <AppContext.Provider value={[appState, setAppState]}>
        <Header categories={headerCategories} />
        <BannerComponent />
        <div className="search-section flex-row">
          <SearchFilterComponent />
          <TourResultComponent />
        </div>
        <div
          className="modal"
          id="signin-modal"
          style={{ display: appState.openModal ? "block" : "none" }}
        >
          <div className="modal-content">
            <div className="modal-header flex-row">
              <div
                className="icon-holder"
                id="close-icon-btn"
                onClick={() => setAppState({ ...appState, openModal: false })}
              ></div>
            </div>
            {/* Modal with sign in / register form */}
            <div className="modal-body">
              {modalDialog ? (
                <>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Email Id"
                  />
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Password"
                  />
                </>
              ) : (
                <>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Email Id"
                  />
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Password"
                  />
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Confirm password"
                  />
                </>
              )}
            </div>
            <div className="modal-footer flex-row justify-spbw">
              {modalDialog ? (
                <>
                  <p>
                    To register{" "}
                    <span className="clickable-text" onClick={handleRegister}>
                      click here.
                    </span>
                  </p>
                  <button className="signin-btn" type="button">
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <p>
                    To login{" "}
                    <span className="clickable-text" onClick={handleLogin}>
                      click here.
                    </span>
                  </p>
                  <button className="signin-btn" type="button">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </AppContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
