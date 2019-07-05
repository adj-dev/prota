const db = require("../models");

assignSprintToProject = (sprintId, projectId) => { //puts a sprint into a project's sprints field
    console.log("Updating Project: "+projectId+" with sprint: "+sprintId);
    db.Project.find({_id: projectId})
        .then(results => { //result is an array of projects, we just want the first one
            results[0].sprints.push(sprintId);
            db.Project.updateOne({_id: projectId}, results[0], {new: true}) //update returns the new project with new: true
                .then(result => {return {success: true, value: result}});
        }).catch(err => err);
}

removeSprintFromProject = (sprintId, projectId) => { //removes a sprint from a project's sprints field
    console.log("Updating Project: "+projectId+" with sprint: "+sprintId);
    db.Project.find({_id: projectId})
        .then(results => { //results is an array of projects, we just want the first one
            results[0].sprints = results[0].sprints.filter( //returns a filtered array where
                id => id != sprintId //the id of the sprint is not the sprint being removed
            );
            db.Project.updateOne({_id: projectId}, results[0], {new: true})
                .then(result => {return {success: true, value: result}});
        }).catch(err => err);
}

module.exports = {

    getAllByProject: function(projectId) { //get all sprints by projectId
        return db.Project
            .find({_id: projectId}).populate({path: 'sprints', populate: {path: 'tasks'}}) //populates all the sprint data in Project's sprints
            .then(results => {return {success: true, value: results[0].sprints}}) //returns just the sprints
            .catch(err => err);
    },
    
    create: function(sprintBody){ //create a sprint
        return db.Sprint
            .create(sprintBody)
            .then(results => { //after creating a sprint
                assignSprintToProject(results._id, sprintBody.project_ref); //assign sprint to project
                return {success: true, value: results}; //return the sprint created
            })
            .catch(err => err);
    },

    updateOneById: function(sprintId, sprint){ //update a sprint using sprintId and the updated sprint
        return db.Sprint
            .findByIdAndUpdate(
                sprintId, 
                sprint,
                {new: true}
            )
            .then(results => {return {success: true, value: results}})
            .catch(err => err);
    },
    
    deleteOneById: function(sprintId){ //delete a sprint by sprintId
        return db.Sprint
            .findById({ _id: sprintId}).populate({path: "tasks"}) //populates all the task data in Sprint's tasks
            .then(results => {
                removeSprintFromProject(sprintId, results.project_ref) //removes the sprint from parent project
                return {success: true, value: results.remove()} //removing the project (and cascade)
            })
            .catch(err => err);
    }
}