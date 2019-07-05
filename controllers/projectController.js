const db = require("../models");

assignProjectToUser = (userId, projectId) => { //puts a project into a user's projects field
    console.log("Updating User: "+userId+" with project: "+projectId);
    return db.User.find({_id: userId})
        .then(results => { //result is an array of users, we just want the first one
            if(results[0].projects.indexOf(projectId) == -1){
                results[0].projects.push(projectId);
                return db.User.updateOne({_id: userId}, results[0], {new: true}) //update returns the new user with new: true
                    .then(result => {return {success: true, value: result}});
            } else {
                return {success: false, value: "User already has this project."};
            }
        }).catch(err => err);
}

removeProjectFromUser = (userId, projectId) => { //removes a project from a user's projects field
    console.log("Updating User: "+userId+" with project: "+projectId);
    return db.User.find({_id: userId})
        .then(results => { //result is an array of user, we just want the first one
            results[0].projects = results[0].projects.filter( //returns a filtered array where
                id => id != projectId //the id of the project is not the project being removed
            );
            return db.User.updateOne({_id: userId}, results[0], {new: true})
                .then(result => {return {success: true, value: result}});
        }).catch(err => err);
}

assignUserToProject = (params, userType) => { //puts a user into a project's owner or contributor fields
    console.log("Updating project: " + params.projectId + " with User: " + params.userId)
    return db.Project.find({_id: params.projectId})
        .then(results => { //result is an array of projects, we just want the first one
            if(results[0].owners.indexOf(params.userId) != -1 || results[0].contributors.indexOf(params.userId) != -1){
                return {success: false, value: "User is already a part of the project."};
            }
            if(userType === "owner"){ //if user is being added as owner
                results[0].owners.push(params.userId); //push to owners
            }
            if(userType === "contributor"){ //if user is being added as contributor
                results[0].contributors.push(params.userId); //push to contributors
            }
            return db.Project.updateOne({_id: params.projectId}, results[0], {new: true})
                .then(result => {return {success: true, value: result}});
        }).catch(err => err);
}

removeUserFromProject = (params, userType) => { //removes a user from a project's owner or contributor fields
    console.log("Updating project: " + params.projectId + " with User: " + params.userId)
    return db.Project.find({_id: params.projectId})
        .then(results => { //result is an array of projects, we just want the first one
            if(userType === "owner" && results[0].owners.length == 1){ //if the user being removed is an owner, AND there is more than one owner
                return {success: false, value: "Removing this owner would create an ownerless project. Prota does not allow for ownerless projects."};
            } else if(userType === "owner"){
                results[0].owners = results[0].owners.filter( //returns a filtered array where
                    id => id !== params.userId //the username of the User is not the User being removed
                );
            }
            if(userType === "contributor"){ //if the user being removed is a contributor
                results[0].contributors = results[0].contributors.filter( //returns a filtered array where
                    id => id !== params.userId //the username of the User is not the User being removed
                );
            }
            return db.Project.updateOne({_id: params.projectId}, results[0], {new: true})
                .then(result => {return {success: true, value: result}});
        }).catch(err => err);
}

module.exports = {
    getAllByUser: function(userId){ //get all projects by req.user
        return db.User
            .find({_id: userId}).populate({path: 'projects'}) //populates all the project data in User's projects
            .then(results => {return {success: true, value: results[0].projects}}) //returns just the projects
            .catch(err=> err); 
    },

    getOneById: function(projectId){ //get project by projectId
        return db.Project.findById({_id: projectId})
            .populate([{path: "sprints", populate: {path: "tasks"}}, {path: "owners"}, {path: "contributors"}])
            .then(result => {return {success: true, value: result}})
            .catch(err => err);
    },

    create: function(project){ //create a project using req.body
        return db.Project.create(project)
            .then(result => { //after creating the project
                result.owners.map(owner => { //for all owners is owners
                    //removed return statement MAY NEED TO BE REPAIRED
                    assignProjectToUser(owner, result._id); //assign project to user
                });
                result.contributors.map(contributor => { //for all contributors in contributors
                    //removed return statement MAY NEED TO BE REPAIRED
                    assignProjectToUser(contributor, result._id); //assign project to user
                });
                return {success: true, value: result}; //return the project created
            })
    },
    
    updateOneById: function(projectId, project){ //update a project by req.params.projectId using req.body
        return db.Project
            .findByIdAndUpdate(
                projectId, 
                project,
                {new: true}
            )
            .then(results => {return {success: true, value: results}})
            .catch(err => err);
    },
    
    deleteOneById: function(projectId){ //delete a project by req.params.projectId
        return db.Project
            .findById({ _id: projectId})//.populate({path: "sprints", populate: {path: "tasks"}}) //populates all the sprint data in Project's sprints
            .then(results => {
                results.owners.map(owner => removeProjectFromUser(owner, projectId)); //removing the project from owners
                results.contributors.map(contributor => removeProjectFromUser(contributor, projectId)); //removing the project from contributors
                return {success: true, value: results.remove()}; //removing the project (and cascade)
            })
            .catch(err => err);
    },

    addUser: function(parameters, userType){
        return assignUserToProject(parameters, userType)
        .then(result1 => {
            if(result1.success) {
                return assignProjectToUser(parameters.userId, parameters.projectId)
                .then(result2 => { //FURTHER REFACTORIZATION
                    if(result1.success){
                        return result2;
                    } else {
                        return result1;
                    }
                });        
            } else {
                return result1;
            }
        }); 
        
    },

    removeUser: function(parameters, userType){
        return removeUserFromProject(parameters, userType)
        .then(result1 => {
            if(result1.success) {
                return removeProjectFromUser(parameters.userId, parameters.projectId)
                .then(result2 => { //FURTHER REFACTORIZATION
                    if(result1.success){
                        return result2;
                    } else {
                        return result1;
                    }
            });
            } else {
                return result1;
            }
        });
    }
}