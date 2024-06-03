import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

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

const DropdownBarMobile = ({
  selectedItem,
  setSelectedItem,
  customItems,
  showModal,
  setShowModal,
}) => {
  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };
  const toggleModalAction = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="container">
        <div className="dropdown-wrapper d-flex justify-content-between p-3">
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedItem || "Select Item"}
            className="d-md-none"
            onSelect={handleSelect}
          >
            {items.map((item) => (
              <Dropdown.Item key={item} eventKey={item}>
                {item}
              </Dropdown.Item>
            ))}
            {customItems.map((item) => (
              <Dropdown.Item key={item.name} eventKey={item.name}>
                {item.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <div className="custom-button">
            <button
              className="btn btn-outline-success"
              onClick={toggleModalAction}
            >
              Add Custom Item +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownBarMobile;
