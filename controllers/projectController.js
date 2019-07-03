const db = require("../models");

assignProjectToUser = (user, projectId) => { //puts a project into a user's projects field
    console.log("Updating User: "+user+" with project: "+projectId);
    db.User.find({username: user})
        .then(result => { //result is an array of users, we just want the first one
            result[0].projects.push(projectId);
            db.User.updateOne({username: user}, result[0], {new: true}) //update returns the new user with new: true
                .then(result => console.log(result));
        }).catch(err => err);
}

removeProjectFromUser = (user, projectId) => { //removes a project from a user's projects field
    console.log("Updating User: "+user+" with project: "+projectId);
    db.User.find({username: user})
        .then(result => { //result is an array of user, we just want the first one
            result[0].projects = result[0].projects.filter( //returns a filtered array where
                id => id != projectId //the id of the project is not the project being removed
            );
            db.User.updateOne({username: user}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

assignUserToProject = (params, userType) => { //puts a user into a project's owner or contributor fields
    console.log("Updating project: " + params.projectId + " with User: " + params.userName)
    db.Project.find({_id: params.projectId})
        .then(result => { //result is an array of projects, we just want the first one
            if(userType === "owner"){ //if user is being added as owner
                result[0].owners.push(params.userName); //push to owners
            }
            if(userType === "contributor"){ //if user is being added as contributor
                result[0].contributors.push(params.userName); //push to contributors
            }
            db.Project.updateOne({_id: params.projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeUserFromProject = (params, userType) => { //removes a user from a project's owner or contributor fields
    console.log("Updating project: " + params.projectId + " with User: " + params.userName)
    db.Project.find({_id: params.projectId})
        .then(result => { //result is an array of projects, we just want the first one
            if(userType === "owner" && result.owners.length > 1){ //if the user being removed is an owner, AND there is more than one owner
                result[0].owners = result[0].owners.filter( //returns a filtered array where
                    name => name !== params.userName //the username of the User is not the User being removed
                );
            }
            if(userType === "contributor"){ //if the user being removed is a contributor
                result[0].contributors = result[0].contributors.filter( //returns a filtered array where
                    name => name !== params.userName //the username of the User is not the User being removed
                );
            }
            db.Project.updateOne({_id: params.projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

module.exports = {
    getAllByUser: function(userName){ //get all projects by req.user
        return db.User
            .find({username: userName}).populate({path: 'projects'}) //populates all the project data in User's projects
            .then(results => results[0].projects) //returns just the projects
            .catch(err=> err); 
    },

    getOneById: function(projectId){ //get project by projectId
        return db.Project.findById({_id: projectId})
            .populate({path: "sprints", populate: {path: "tasks"}})
            .then(result => result)
            .catch(err => err);
    },

    create: function(project){ //create a project using req.body
        return db.Project.create(project)
            .then(result => { //after creating the project
                result.owners.map(owner => { //for all owners is owners
                    return assignProjectToUser(owner, result._id); //assign project to user
                });
                result.contributors.map(contributor => { //for all contributors in contributors
                    return assignProjectToUser(contributor, result._id); //assign project to user
                });
                return result; //return the project created
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
            .findById({ _id: projectId})//.populate({path: "sprints", populate: {path: "tasks"}}) //populates all the sprint data in Project's sprints
            .then(results => {
                results.owners.map(owner => removeProjectFromUser(owner, projectId)); //removing the project from owners
                results.contributors.map(contributor => removeProjectFromUser(contributor, projectId)); //removing the project from contributors
                return results.remove(); //removing the project (and cascade)
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