import { useState } from "react";
import DropDown from "./DropDown";

export default function MenuItem({ items }) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <>
      <div className="menuitem-container" onClick={() => setShowSubMenu(!showSubMenu)}>
        {items.subCategories ? (
          <>
            <div
              className="dropdown-console-container"
            >
              <button
                type="button"
                aria-haspopup="menu"
                className="dropdown-btn"
              >
                {items.title}
              </button>
              <div
                className="icon-holder"
                id="dropdownarrow"
                style={{
                  transform: showSubMenu ? "rotate(180deg)" : "rotate(0deg)",
                }}
              ></div>
              <DropDown list={items.subCategories} showMenu={showSubMenu} />
            </div>
          </>
        ) : (
          <a href={items.url}>{items.title}</a>
        )}
      </div>
    </>
  );
}
