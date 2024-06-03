// src/components/Grid.js
import React from "react";
import GridCell from "./GridCell";
import "./Grid.css";

const Grid = ({ grid, handleCellClick, selectedCells }) => {
  return (
    <div className="grid m-4">
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isSelected={selectedCells.some(
                (selectedCell) =>
                  selectedCell.row === rowIndex && selectedCell.col === colIndex
              )}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
