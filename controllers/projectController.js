const db = require("../models");

module.exports = {
    getAllByUser: function(userId){ //get all projects by req.user
        console.log(userId);
        return db.User
            .findById({_id: userId}).populate('Project')
            .then(results => results)
            .catch(err => err);
    },

    getOneById: function(projectId){ //get project by projectId
        console.log(projectId);
        return db.Project
            .findById({_id: projectId})
            .populate('User').populate('Sprint')
            .then(results => results)
            .catch(err => err);
    },

    create: function(project){ //create a project using req.body
        console.log(project);
        return db.Project
            .create(project)
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },
    
    updateOneById: function(projectId, project){ //update a project by req.params.projectId using req.body
        console.log(projectId + " "+ project);
        return db.Project
            .findByIdAndUpdate(
                projectId, 
                project,
                {new: true}
            )
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },
    
    deleteOneById: function(projectId){ //delete a project by req.params.projectId
        console.log(projectId);
        return db.Project
            .findById({ _id: projectId})
            .then(results => results.remove())
            .then(results => res.json(results))
            .catch(err => res.json(err));
    }
}