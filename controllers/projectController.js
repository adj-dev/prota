const db = require("../models");

assignProjectToUser = (user, projectId) => {
    console.log("Updating User: "+user+" with project: "+projectId);
    db.User.find({username: user})
        .then(result => {
            result[0].projects.push(projectId);
            db.User.updateOne({username: user}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeProjectFromUser = (user, projectId) => {
    console.log("Updating User: "+user+" with project: "+projectId);
    db.User.find({username: user})
        .then(result => {
            result[0].projects = result[0].projects.filter(
                id => id != projectId
            );
            db.User.updateOne({username: user}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

assignUserToProject = (params, userType) => {
    console.log("Updating project: " + params.projectId + " with User: " + params.userName)
    db.Project.find({_id: params.projectId})
        .then(result => {
            if(userType === "owner"){
                result[0].owners.push(params.userName);
            }
            if(userType === "contributor"){
                result[0].contributors.push(params.userName);
            }
            db.Project.updateOne({_id: params.projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeUserFromProject = (params, userType) => {
    console.log("Updating project: " + params.projectId + " with User: " + params.userName)
    db.Project.find({_id: params.projectId})
        .then(result => {
            if(userType === "owner" && result.owners.length > 1){
                result[0].owners = result[0].owners.filter(
                    name => name !== params.userName
                );
            }
            if(userType === "contributor"){
                result[0].contributors = result[0].contributors.filter(
                    name => name !== params.userName
                );
            }
            db.Project.updateOne({_id: params.projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

module.exports = {
    getAllByUser: function(userName){ //get all projects by req.user
        return db.User
            .find({username: userName}).populate({path: 'projects'})
            .then(results => results[0].projects);
    },

    getOneById: function(projectId){ //get project by projectId
        return db.Project.findById({_id: projectId});
    },

    create: function(project){ //create a project using req.body
        return db.Project.create(project)
            .then(result => {
                result.owners.map(owner => {
                    return assignProjectToUser(owner, result._id);
                });
                result.contributors.map(contributor => {
                    return assignProjectToUser(contributor, result._id);
                });
                return result;
            })
    },
    
    updateOneById: function(projectId, project){ //update a project by req.params.projectId using req.body
        return db.Project
            .findByIdAndUpdate(
                projectId, 
                project,
                {new: true}
            )
            .then(results => results)
            .catch(err => err);
    },
    
    deleteOneById: function(projectId){ //delete a project by req.params.projectId
        return db.Project
            .findById({ _id: projectId}).populate("Sprint")
            .then(results => {
                results.owners.map(owner => removeProjectFromUser(owner, projectId));
                results.contributors.map(contributor => removeProjectFromUser(contributor, projectId));
                return results.remove();
            })
            .catch(err => err);
    },

    addUser: function(parameters, userType){
        assignUserToProject(parameters, userType);
        assignProjectToUser(parameters.userName, parameters.projectId);
    },

    removeUser: function(parameters, userType){
        removeUserFromProject(parameters, userType);
        removeProjectFromUser(parameters.userName, parameters.projectId);
    }
}