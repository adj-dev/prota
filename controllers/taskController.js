const db = require("../models");

assignTaskToSprint = (taskId, sprintId) => {
    console.log("Updating Sprint: "+sprintId+" with task: "+taskId);
    db.Sprint.find({_id: sprintId})
        .then(result => {
            result[0].tasks.push(taskId);
            db.Sprint.updateOne({_id: sprintId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeTaskFromSprint = (taskId, sprintId) => {
    console.log("Updating Sprint: "+sprintId+" with task: "+taskId);
    db.Sprint.find({_id: sprintId})
        .then(result => {
            result[0].tasks = result[0].tasks.filter(
                id => id != taskId
            );
            db.Sprint.updateOne({_id: sprintId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

module.exports = {
    
    getAllByProject: function(projectId) { //get all tasks by sprintId
        //Function needs review
        console.log(projectId);
        return db.Project
            .findById({_id: projectId})
            .populate('Sprint')
            .populate('Task')
            .then(results => results)
            .catch(err => err);
    },
    
    getAllBySprint: function(sprintId) { //get all tasks by sprintId
        //Function needs review
        console.log(sprintId);
        return db.Sprint
            .findById({_id: sprintId}).populate('Task')
            .then(results => results)
            .catch(err => err);

    },
    
    getAllByUser: function(userId){ //get all tasks by req.user
        console.log(userId);
        //NEEDS CODE
    },

    create: function(task){ //create a task 
        console.log(task);
        return db.Task
            .create(task)
            .then(results => {
                assignTaskToSprint(results._id, task.sprint_ref);
                return results;
            })
            .catch(err => res.json(err));
    },
    
    updateOneById: function(taskId, task){ //update a task by taskId
        console.log(taskId);
        return db.Task
            .findByIdAndUpdate(
                taskId, 
                task,
                {new: true}
            )
            .then(results => results)
            .catch(err => err);
    },
    
    deleteOneById: function(taskId){ //delete a task by req.params.taskId
        console.log(taskId);
        return db.Task
            .findById({ _id: taskId})
            .then(results => {
                removeTaskFromSprint(taskId, results.sprint_ref);
                return results.remove();
            })
            .catch(err => err);
    }
}