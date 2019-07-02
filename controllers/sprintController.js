const db = require("../models");

module.exports = {

    getAllByProject: function(projectId) { //get all sprints by projectId
        //Function needs review
        console.log(projectId)
        return db.Project
            .findById({_id: projectId}).populate('Sprint')
            .then(results => results)
            .catch(err => err);
    },

    
    create: function(sprint){ //create a sprint
        console.log(sprint);
        return db.Sprint
            .create(sprint)
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },

    updateOneById: function(sprintId, sprint){ //update a sprint using sprintId and the updated sprint
        console.log(sprintId + " "+ sprint);
        return db.Sprint
            .findByIdAndUpdate(
                sprintId, 
                sprint,
                {new: true}
            )
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },
    
    deleteOneById: function(sprintId){ //delete a sprint by sprintId
        console.log(sprintId);
        return db.Sprint
            .findById({ _id: sprintId})
            .then(results => results.remove())
            .then(results => res.json(results))
            .catch(err => res.json(err));
    }
}