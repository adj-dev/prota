const db = require("../models");

assignProjectToUser = (user, projectId) => {
    console.log("Updating User: "+user+" with project: "+projectId);
    db.User.find({username: user})
        .then(result => {
            //console.log(result);
            result[0].projects.push(projectId);
            //console.log(result[0].projects)
            db.User.updateOne({username: user}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeProjectFromUser = (user, projectId) => {
    console.log("Updating User: "+user+" with project: "+projectId);
    db.User.find({username: user})
        .then(result => {
            //console.log(result);
            result[0].projects = result[0].projects.filter(
                id => id != projectId
            );
            //console.log(result[0].projects)
            db.User.updateOne({username: user}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

assignUserToProject = (params, userType) => {
    console.log("Updating project: " + params.projectId + " with User: " + params.userName)
    db.Project.find({_id: params.projectId})
        .then(result => {
            //console.log(result);
            if(userType === "owner"){
                result[0].owners.push(params.userName);
            }
            if(userType === "contributor"){
                result[0].contributors.push(params.userName);
            }
            //console.log(result[0].projects)
            db.Project.updateOne({_id: params.projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeUserFromProject = (params, userType) => {
    console.log("Updating project: " + params.projectId + " with User: " + params.userName)
    db.Project.find({_id: params.projectId})
        .then(result => {
            //console.log(result);
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
            //console.log(result[0].projects)
            db.Project.updateOne({_id: params.projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

module.exports = {
    getAllByUser: function(userId){ //get all projects by req.user
        console.log(userId);
        return db.User
            .findById({_id: userId}).populate('Project')
            .then(results => results.projects)
    },

    getOneById: function(projectId){ //get project by projectId
        console.log(projectId);
        return db.Project.findById({_id: projectId})
    },

    create: function(project){ //create a project using req.body
        console.log(project);
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
        console.log(projectId + " "+ project);
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
        console.log(projectId);
        return db.Project
            .findById({ _id: projectId})
            .then(results => {
                result.owners.map(owner => {
                    return removeProjectFromUser(owner, result._id);
                });
                result.contributors.map(contributor => {
                    return FemoveProjectFromUser(contributor, result._id);
                });
                results.remove();
            })
            .then(results => results)
            .catch(err => err);
    },

    addUser: function(parameters, userType){
        console.log(parameters.projectId + " " + parameters.userName);
        assignUserToProject(parameters, userType);
        assignProjectToUser(parameters.userName, parameters.projectId);
    },

    removeUser: function(parameters, userType){
        console.log(parameters.projectId + " " + parameters.userName);
        removeUserFromProject(parameters, userType);
        removeProjectFromUser(parameters.userName, parameters.projectId);
    }
}