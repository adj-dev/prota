import React from "react";
import { OPEN, IN_PROGRESS, DONE } from "../../helpers";
import "./style.css";
const displayValues = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN PROGRESS",
  DONE: "DONE"
};
const statuses = [OPEN, IN_PROGRESS, DONE];

export default function StatusDropdown({
  selectedStatus,
  taskId,
  handleChangeStatus
}) {
  return (
    <div className="selected-status">
      {displayValues[selectedStatus]}
      <div className="options-wrapper">
        <div className="options">
          {statuses.map((status, i) => {
            if (status !== selectedStatus) {
              return (
                <div
                  key={i}
                  alt={status}
                  className={"status"}
                  onClick={() => {
                    handleChangeStatus(taskId, status);
                  }}
                >
                  {displayValues[status]}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
