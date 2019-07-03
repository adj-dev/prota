var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
        default: "OPEN"
    },
    owners: [{
        type: String,
        required: true
    }],
    contributors: [{
        type: String
    }],
    sprints: [{
        type: Schema.Types.ObjectId,
        ref: "Sprint"
    }]
});

var Sprint = require('./sprint');
ProjectSchema.post('remove', document => {
    Sprint.find({project_ref: document._id}).then(sprints => {
        sprints.map(sprint => sprint.remove());
    }).catch(err => err);
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;