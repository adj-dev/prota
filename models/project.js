var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    contributors: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    sprints: [{
        type: Schema.Types.ObjectId,
        ref: "Sprint"
    }]
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;