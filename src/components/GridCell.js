import React from "react";
import "./GridCell.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const GridCell = ({ value, isSelected, onClick }) => {
  const cellClass = value && value.merged ? "grid-cell merged" : "grid-cell";
  const selectedClass = isSelected ? "selected" : "";

  // console.log("api coming ", value);

  return (
    <OverlayTrigger
      placement={"top"}
      overlay={
        <Tooltip
          style={
            value?.name && value?.merged && !isSelected
              ? {}
              : { display: "none" }
          }
          id="tooltip-top"
        >
          {value?.name}
        </Tooltip>
      }
    >
      <div
        className={`${cellClass} ${selectedClass}`}
        onClick={onClick}
        style={
          value && value.merged
            ? {
                gridRow: `${value.area.startRow + 1} / span ${
                  value.area.endRow - value.area.startRow + 1
                }`,
                gridColumn: `${value.area.startCol + 1} / span ${
                  value.area.endCol - value.area.startCol + 1
                }`,
                backgroundImage: `url(${value.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {!value || !value.merged
          ? value &&
            !value.merged && <div className="cell-content">{value.name}</div>
          : null}
      </div>
    </OverlayTrigger>
  );
};

export default GridCell;
