import React from "react";
import "./style.css";

export default function MyTaskStatusPicker({ handleSelectStatus }) {
  const STATUSES = [
    { status: "OPEN", displayName: "open" },
    { status: "IN_PROGRESS", displayName: "in progress" },
    { status: "DONE", displayName: "done" }
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
