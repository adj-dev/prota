import React from "react";
import "./style.css";
import StatusDropdown from "../../StatusDropdown";

const ALL = "ALL";
const OPEN = "OPEN";
const IN_PROGRESS = "IN_PROGRESS";

export default function MyTaskList({ tasks, status, handleChangeStatus }) {
  return (
    <div className="my-task-list-container">
      {tasks.length ? (
        tasks.map((task, i) => {
          return (
            <div className="task-container" key={task._id}>
              <div className="task-upper">
                <span>{task.name}</span>
                <span>
                  <StatusDropdown
                    selectedStatus={task.status}
                    taskId={task._id}
                    handleChangeStatus={handleChangeStatus}
                  />
                </span>
              </div>
              <div className="task-lower">
                <p>{task.description}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="empty-task-list">
          {status === ALL ? (
            <p>You have no assigned tasks</p>
          ) : status === OPEN ? (
            <p>No open tasks</p>
          ) : status === IN_PROGRESS ? (
            <p>No tasks in progress</p>
          ) : (
            <p>No completed tasks</p>
          )}
        </div>
      )}
    </div>
  );
}
