const db = require("../models");

module.exports = {
    getAllByUser: function(req, res){ //get all projects by req.user
        console.log(req.user);
        //NEEDS CODE
    },

    getOneById: function(req, res){ //get project by req.params.projectId
        console.log(req.params.projectId);
        //NEEDS CODE
    },

    create: function(req, res){ //create a project using req.body
        console.log(req.body);
        db.Project
            .create(req.body)
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },
    
    updateOneById: function(req, res){ //update a project by req.params.projectId using req.body
        db.Project.findById({_id: req.params.projectId})
            .then() //NEEDS CODE
            .catch(err => res.json(err));
    },
    
    deleteOneById: function(req, res){ //delete a project by req.params.projectId
        db.Project.findById({ _id: req.params.projectId})
            .then(results => results.remove())
            .then(results => res.json(results))
            .catch(err => res.json(err));
    }
}