import React, { useState } from "react";
import "./style.css";

const ALL = "ALL";
const OPEN = "OPEN";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";

export default function MyTaskStatusPicker({ handleSelectStatus }) {
  const STATUSES = [
    { status: OPEN, displayName: "open" },
    { status: IN_PROGRESS, displayName: "in progress" },
    { status: DONE, displayName: "done" }
  ];
  const [status, setStatus] = useState(OPEN);

  const selectStatus = status => {
    setStatus(status);
    handleSelectStatus(status);
  };

  return (
    <div className="status-picker-container">
      <div className="status-buttons">
        <div className="status">
          <div
            className={`button-bg ${status === ALL ? "active" : ""}`}
            id="all-tasks"
          >
            <button onClick={() => selectStatus(ALL)}>all</button>
          </div>
        </div>
        <div className="status">
          <div
            className={`button-bg ${status === OPEN ? "active" : ""}`}
            id="open-tasks"
          >
            <button onClick={() => selectStatus(OPEN)}>open</button>
          </div>
        </div>
        <div className="status">
          <div
            className={`button-bg ${status === IN_PROGRESS ? "active" : ""}`}
            id="in-progress-tasks"
          >
            <button onClick={() => selectStatus(IN_PROGRESS)}>
              in progress
            </button>
          </div>
        </div>
        <div className="status">
          <div
            className={`button-bg ${status === DONE ? "active" : ""}`}
            id="done-tasks"
          >
            <button onClick={() => selectStatus(DONE)}>done</button>
          </div>
        </div>
      </div>
    </div>
  );
}
