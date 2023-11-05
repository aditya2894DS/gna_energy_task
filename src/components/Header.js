import MenuItem from "./MenuItem";
import "../style/Header.css";
import { useContext } from "react";
import { AppContext } from "../AppContext.js";

export default function Header({ categories }) {

  const [modalStatus, setModalStatus] = useContext(AppContext);

  function handleSignIn(){
    setModalStatus({...modalStatus, openModal: true});
  }

  return (
    <>
      <div className="header-container flex-row justify-spbw">
        <div className="flex-row justify-center align-center">
          <p className="logo-txt">Trip web</p>
        </div>
        <div className="flex-row justify-spbw">
          {categories.map((item) => {
            return <MenuItem key={item.id} items={item} />;
          })}
        </div>
        <div className="flex-row justify-center">
          <button
            type="button"
            className="button header-btn"
            data-toggle="modal"
            data-target="#signinmodal"
            id="header-btn-1"
            onClick={handleSignIn}
          >
            Sign In / Register
          </button>
        </div>
      </div>
    </>
  );
}
