const db = require("../models");

assignSprintToProject = (sprintId, projectId) => {
    console.log("Updating Project: "+projectId+" with sprint: "+sprintId);
    db.Project.find({_id: projectId})
        .then(result => {
            result[0].sprints.push(sprintId);
            db.Project.updateOne({_id: projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

removeSprintFromProject = (sprintId, projectId) => {
    console.log("Updating Project: "+projectId+" with sprint: "+sprintId);
    db.Project.find({_id: projectId})
        .then(result => {
            result[0].sprints = result[0].sprints.filter(
                id => id != sprintId
            );
            db.Project.updateOne({_id: projectId}, result[0], {new: true})
                .then(result => console.log(result));
        }).catch(err => err);
}

module.exports = {

    getAllByProject: function(projectId) { //get all sprints by projectId
        //console.log(projectId)
        return db.Project
            .findById({_id: projectId}).populate('Sprint')
            .then(results => results.sprints)
            .catch(err => err);
    },
    
    create: function(sprintBody){ //create a sprint
        //console.log(sprint);
        return db.Sprint
            .create(sprintBody)
            .then(results => {
                assignSprintToProject(results._id, sprintBody.project_ref);
                return results;
            })
            .catch(err => err);
    },

    updateOneById: function(sprintId, sprint){ //update a sprint using sprintId and the updated sprint
        // console.log(sprintId + " "+ sprint);
        return db.Sprint
            .findByIdAndUpdate(
                sprintId, 
                sprint,
                {new: true}
            )
            .then(results => results)
            .catch(err => err);
    },
    
    deleteOneById: function(sprintId){ //delete a sprint by sprintId
        // console.log(sprintId);
        return db.Sprint
            .findById({ _id: sprintId})
            .then(results => {
                removeSprintFromProject(sprintId, results.project_ref)
                return results.remove()
            })
            .catch(err => err);
    }
}