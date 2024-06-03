// src/App.js
import React, { useState } from "react";
import Grid from "./components/Grid";
import Toolbar from "./components/Toolbar";
import "./App.css";
import stageImage from "./images/stage.png";
import chairImage from "./images/chair.jpeg";
import entryGateImage from "./images/entrygate.png";
import bigstalls from "./images/bigstall.png";
import smallstalls from "./images/smallstall.png";
import gamezone from "./images/gamezone.jpg";
import greenroom from "./images/green-room.png";
import road from "./images/road.png";
import { Button, Modal } from "react-bootstrap";
import CustomItemModal from "./components/CustomItemModal";
import DropdownBarMobile from "./components/DropdownBarMobile";
// import Modal from "./components/Modal";

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [grid, setGrid] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  );
  const [selectedCells, setSelectedCells] = useState([]);
  const [lastClickedCell, setLastClickedCell] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [customItems, setCustomItems] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const handleCellClick = (row, col) => {
    if (isEditing) {
      const cell = grid[row][col];
      if (cell && cell.merged) {
        // Deselect only the clicked cell
        const newGrid = grid.map((gridRow, rowIndex) =>
          gridRow.map((gridCell, colIndex) => {
            if (rowIndex === row && colIndex === col) {
              return null;
            }
            return gridCell;
          })
        );
        setGrid(newGrid);
      }
    } else if (selectedItem) {
      const newSelectedCells = [...selectedCells];
      let cellToUpdate = null;

      const clickedCellIndex = newSelectedCells.findIndex(
        (cell) => cell.row === row && cell.col === col
      );

      if (clickedCellIndex > -1) {
        // Deselect the cell (clicked twice)
        cellToUpdate = { ...grid[row][col] }; // Copy original cell data
        newSelectedCells.splice(clickedCellIndex, 1);
      } else {
        // Select the cell (clicked once)
        cellToUpdate = {
          name: selectedItem.charAt(0),
          selected: true,
          row,
          col,
        };
        newSelectedCells.push({ row, col });
      }

      // Update grid with modified cell data (clear name for deselected cell)
      const newGrid = grid.map((gridRow, rowIndex) =>
        gridRow.map((cell, colIndex) =>
          rowIndex === row && colIndex === col
            ? clickedCellIndex > -1
              ? null
              : cellToUpdate
            : cell
        )
      );

      setSelectedCells(newSelectedCells);
      setGrid(newGrid);
    }
  };

  const handleConfirm = () => {
    if (selectedCells.length > 0) {
      const [firstCell, ...restCells] = selectedCells;

      const itemImages = {
        Stage: stageImage,
        Chair: chairImage,
        "Entry Gate": entryGateImage,
        "Big Stalls": bigstalls,
        "Small Stalls": smallstalls,
        Road: road,
        "Game Zone": gamezone,
        "Green Room": greenroom,
        ...customItems.reduce((acc, item) => {
          acc[item.name] = item.image;
          return acc;
        }, {}),
      };

      const newGrid = grid.map((gridRow, rowIndex) =>
        gridRow.map((cell, colIndex) => {
          const isSelectedCell = selectedCells.some(
            (cell) => cell.row === rowIndex && cell.col === colIndex
          );
          if (isSelectedCell) {
            return {
              name: selectedItem,
              merged: true,
              image: itemImages[selectedItem],
              showName:
                rowIndex === firstCell.row && colIndex === firstCell.col,
              cells: selectedCells.length,
              area: {
                startRow: firstCell.row,
                startCol: firstCell.col,
                endRow: Math.max(...selectedCells.map((cell) => cell.row)),
                endCol: Math.max(...selectedCells.map((cell) => cell.col)),
              },
            };
          }
          return cell;
        })
      );

      setGrid(newGrid);
      setSelectedCells([]);
      setLastClickedCell(null);
      setSelectedItem(null);
    }
  };

  const handleAddCustomItem = (name, image) => {
    setCustomItems([...customItems, { name, image }]);
    setModalShow(false);
  };

  return (
    <div className="app">
      <div className="desktop-view">
        <Toolbar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          showModal={modalShow}
          setShowModal={setModalShow}
          customItems={customItems}
        />
      </div>
      <Grid
        grid={grid}
        handleCellClick={handleCellClick}
        selectedCells={selectedCells}
      />
      <div className="mobile-view">
        <DropdownBarMobile
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          customItems={customItems}
          showModal={modalShow}
          setShowModal={setModalShow}
        />
      </div>
      <div className="confirm-button-box d-flex justify-content-between gap-3">
        <button
          className="btn btn-primary"
          onClick={handleConfirm}
          disabled={selectedItem && selectedCells.length > 0 ? false : true}
        >
          Confirm {selectedItem && selectedCells.length > 0 && selectedItem}
        </button>
        <button
          className={`btn btn-${!isEditing ? "outline-danger" : "success"}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? "Edit" : "Save"}
        </button>
      </div>
      <CustomItemModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        onSave={handleAddCustomItem}
      />
    </div>
  );
};

export default App;
