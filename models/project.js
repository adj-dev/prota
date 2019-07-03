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
        enum: ["Open", "In Progress", "Closed"],
        default: "Open"
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

// ProjectSchema.pre('remove', next => {
//     // this.model("User").update(
//     //     {projects: this._id},
//     //     { $pull: {projects: this._id} },
//     //     {multi: true}
//     // ).exec();
//     this.model("Sprint").remove(
//         {project_ref: this._id}
//     ).exec();
//     // this.model("Task").remove(
//     //     {project_ref: this._id}
//     // ).exec();
//     next();
// })

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;