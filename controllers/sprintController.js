const db = require("../models");

module.exports = {
    getAllByProject: function(req, res) { //get all sprints by req.params.projectId
        console.log(req.params.projectId)
        //NEEDS CODE
    },

    
    create: function(req, res){ //create a sprint using req.body
        console.log(req.body);
        db.Sprint
            .create(req.body)
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },

    updateOneById: function(req, res){ //update a sprint by req.params.sprintId using req.body
        db.Sprint.findById({_id: req.params.sprintId})
            .then() //NEEDS CODE
            .catch(err => res.json(err));
    },
    
    deleteOneById: function(req, res){ //delete a sprint by req.params.sprintId
        db.Sprint.findById({ _id: req.params.sprintId})
            .then(results => results.remove())
            .then(results => res.json(results))
            .catch(err => res.json(err));
    }
}