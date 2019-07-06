import React from "react";
import "./style.css";

const ALL = "ALL";
const OPEN = "OPEN";
const IN_PROGRESS = "IN_PROGRESS";

export default function MyTaskList({ tasks, status }) {
  return (
    <div className="my-task-list-container">
      {tasks.length ? (
        tasks.map((task, i) => {
          return (
            <div className={"my-task-list-item"} key={i}>
              {task.name}
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
