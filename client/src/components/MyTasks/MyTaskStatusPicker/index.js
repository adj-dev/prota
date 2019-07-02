import React from "react";
import "./style.css";

export default function MyTaskStatusPicker({ handleSelectStatus }) {
  const STATUSES = [
    { status: "OPEN", displayName: "Open" },
    { status: "IN_PROGRESS", displayName: "In Progress" },
    { status: "DONE", displayName: "Done" }
  ];
  return (
    <div className="status-picker-container">
      {STATUSES.map((status, i) => {
        return (
          <div
            className="status-button"
            id={status.status}
            key={i}
            onClick={() => {
              handleSelectStatus(status.status);
            }}
          >
            {status.displayName}
          </div>
        );
      })}
    </div>
  );
}
