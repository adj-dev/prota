import React, { useState, useEffect } from 'react'
import TaskList from '../TaskList';
import "./style.css"



// Declare our selector values here as variables, this way we get a helpful error if we mispell a variable vs. 
// getting no error thrown if we mispell the string.
const ALL = 'ALL';
const OPEN = 'OPEN';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';



const TaskListSelector = ({ tasks, selection, handleAssignTask }) => {
  console.log(selection);
  const [allTasks, setAllTasks] = useState(tasks);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    setAllTasks(tasks)
    setSelectedTasks(selection) // This line defaults the tasks list to show ALL tasks -- eventually want to default to OPEN
  }, [tasks, selection])

  const userSelectsTasks = status => {
    let selection = allTasks.filter(task => task.status === status);
    status === ALL ? setSelectedTasks(tasks) : setSelectedTasks(selection);
  }

  // Passes up the click handler on a task up to the parent (Project) component.
  const passAssignTask = taskId => {
    // console.log(taskId);
    handleAssignTask(taskId);
  }

  return (
    <div className="tasklist-wrapper">
      <div className="tasklist-container">
        <h1>Tasks</h1>
        <br></br>
        {/* Status buttons */}
        <div className="status-buttons">
          <div className="status">
            <button id="all-tasks" onClick={() => userSelectsTasks(ALL)}>all</button>
          </div>
          <div className="status">
            <button id="open-tasks" onClick={() => userSelectsTasks(OPEN)}>open</button>
          </div>
          <div className="status">
            <button id="in-progress-tasks" onClick={() => userSelectsTasks(IN_PROGRESS)}>in progress</button>
          </div>
          <div className="status">
            <button id="done-tasks" onClick={() => userSelectsTasks(DONE)}>done</button>
          </div>
        </div>
        <br></br>
        <TaskList tasks={selectedTasks} handleClick={(taskId) => passAssignTask(taskId)} />

      </div>
    </div>
  )
}

export default TaskListSelector