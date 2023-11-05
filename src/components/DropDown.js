import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function DropDown({ list, showMenu }) {
  const [selectCountry, setSelectCountry] = useContext(AppContext);

  function handleClick(e) {
    let country = e.target.innerText;
    setSelectCountry({ ...selectCountry, countrySelected: country });
  }

  return (
    <>
      <div
        className="dropdown-container"
        style={{ display: showMenu ? "block" : "none" }}
      >
        <ul className="dropdown">
          {list.map((item) => (
            <li key={item.id} onClick={handleClick}>
              {item.country}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
