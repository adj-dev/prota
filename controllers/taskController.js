const db = require("../models");

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
            .then(results => res.json(results))
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
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },
    
    deleteOneById: function(taskId){ //delete a task by req.params.taskId
        console.log(taskId);
        return db.Task
            .findById({ _id: taskId})
            .then(results => results.remove())
            .then(results => res.json(results))
            .catch(err => res.json(err));
    }
}