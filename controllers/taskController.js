const db = require("../models");

module.exports = {
    getAllBySprint: function(req, res){ //get all tasks by req.params.sprintId
        console.log(req.params.sprintId);
        //NEEDS CODE
    },
    
    getAllByUser: function(req, res){ //get all tasks by req.user
        console.log(req.user);
        //NEEDS CODE
    },

    create: function(req, res){ //create a task using req.body
        console.log(req.body);
        db.Task
            .create(req.body)
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },
    
    updateOneById: function(req, res){ //update a task by req.params.taskId using req.body
        db.Task.findById({_id: req.params.taskId})
            .then() //NEEDS CODE
            .catch(err => res.json(err));
    },
    
    deleteOneById: function(req, res){ //delete a task by req.params.taskId
        db.Task.findById({ _id: req.params.taskId})
            .then(results => results.remove())
            .then(results => res.json(results))
            .catch(err => res.json(err));
    }
}