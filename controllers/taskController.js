const db = require("../models");

assignTaskToSprint = (taskId, sprintId) => { //puts a task into a sprint's tasks field
    console.log("Updating Sprint: " + sprintId + " with task: " + taskId);
    db.Sprint.findOne({ _id: sprintId })
        .then(result => { //results in an array of sprints, we just want the first one
            result.tasks.push(taskId);
            db.Sprint.updateOne({ _id: sprintId }, result, { new: true, useFindAndModify: false }) //update returns the new project with new: true
                .then(update => update);
        }).catch(err => err);
}

removeTaskFromSprint = (taskId, sprintId) => { //removes a task from a sprint's tasks field
    console.log("Updating Sprint: " + sprintId + " with task: " + taskId);
    db.Sprint.findOne({ _id: sprintId })
        .then(result => { //results in an array of sprints, we just want the first one
            result.tasks = result.tasks.filter( //returns a filtered array where
                id => id != taskId //the id of the task is not the task being removed
            );
            db.Sprint.updateOne({ _id: sprintId }, result, { new: true, useFindAndModify: false })
                .then(update => update);
        }).catch(err => err);
}

module.exports = {

    getAllByProject: function (projectId) { //get all tasks by projectId
        return db.Task
            .find({ project_ref: projectId })
            .then(results => results) //this will return all the tasks for a project
            .catch(err => err);
    },

    getAllBySprint: function (sprintId) { //get all tasks by sprintId
        return db.Sprint
            .findOne({ _id: sprintId }).populate({ path: 'tasks' }) //populate all task data in Sprint's tasks field
            .then(result => result.tasks) //Return only the task data
            .catch(err => err);
    },

    getAllByUser: function (userId) { //get all tasks by req.user
        return db.Task
            .find({ assignee: userId })//.populate({path: "assignee"})
            .then(results => results)
            .catch(err => err);
    },

    create: function (task) { //create a task 
        return db.Task
            .create(task)
            .then(results => { //after creating a task
                assignTaskToSprint(results._id, task.sprint_ref); //assign task to sprint
                return db.Task.findById({ _id: results._id }).populate({ path: "assignee" })
                    .then(result => result); //returns the task created
            })
            .catch(err => err);
    },

    updateOneById: function (taskId, task) { //update a task by taskId
        return db.Task
            .findByIdAndUpdate(
                taskId,
                task,
                { new: true, useFindAndModify: false }
            ).populate({ path: "assignee" })
            .then(results => results)
            .catch(err => err);
    },

    deleteOneById: function (taskId) { //delete a task by req.params.taskId
        return db.Task
            .findById({ _id: taskId })
            .then(results => {
                removeTaskFromSprint(taskId, results.sprint_ref); //removes the task from parent sprint
                return results.remove(); //removing the project (lowest level, no cascade)
            })
            .catch(err => err);
    }
}