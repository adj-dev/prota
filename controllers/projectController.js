const db = require("../models");

module.exports = {
    getAllByUser: function(userId){ //get all projects by req.user
        console.log(userId);
        return db.User.findById({_id: userId}).populate('Project')
            .then(results => results)
            .catch(err => err);
    },

    getOneById: function(projectId){ //get project by req.params.projectId
        console.log(projectId);
        return db.Project.findById({_id: projectId})
        .populate('User').populate('Sprint')
            .then(results => results)
            .catch(err => err);
    },

    create: function(req, res){ //create a project using req.body
        console.log(req.body);
        return db.Project
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