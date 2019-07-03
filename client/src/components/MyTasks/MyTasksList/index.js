import React from "react";
import "./style.css";

export default function MyTaskList({ tasks }) {
  return (
    <div className="my-task-list-container">
      {tasks
        ? tasks.map((task, i) => {
            return (
              <div className={"my-task-list-item"} key={i}>
                {task.name}
              </div>
            );
          })
        : "No tasks to display"}
    </div>
  );
}
