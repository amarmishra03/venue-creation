// src/components/Toolbar.js
import React from "react";
import logo from "../images/mysponsor.png"
import "./Toolbar.css";

const items = [
  "Stage",
  "Chair",
  "Entry Gate",
  "Big Stalls",
  "Small Stalls",
  "Road",
  "Game Zone",
  "Green Room",
];

const Toolbar = ({
  selectedItem,
  setSelectedItem,
  isSidebarOpen,
  setIsSidebarOpen,
  showModal,
  setShowModal,
  customItems,
}) => {
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className={`toolbar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="box d-flex p-2 justify-content-center align-items-center">
        <img src={logo} />
        <h4 className="m-0 font-weight-bolder">Toolbar</h4>
      </div>
      {isSidebarOpen && (
        <>
          {items.map((item) => (
            <div
              key={item}
              className={`toolbar-item ${
                selectedItem === item ? "selected" : ""
              }`}
              onClick={() => setSelectedItem(item)}
            >
              {item} {selectedItem === item && <span className="tick">✓</span>}
            </div>
          ))}
          {customItems.map((item) => (
            <div
              key={item.name}
              className={`toolbar-item ${
                selectedItem === item.name ? "selected" : ""
              }`}
              onClick={() => setSelectedItem(item.name)}
            >
              {item.name}{" "}
              {selectedItem === item.name && <span className="tick">✓</span>}
            </div>
          ))}
          <div className={`toolbar-item`} onClick={toggleModal}>
            Create Custom Item +
          </div>
        </>
      )}
      <div
        className="toggle-button p-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <h2>{isSidebarOpen ? "<" : ">"}</h2>
      </div>
    </div>
  );
};

export default Toolbar;
