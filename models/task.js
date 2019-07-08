var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    closed_at: Date,
    status: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "DONE", "CLOSED"],
        default: "OPEN"
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    project_ref: {
        type: String,
        required: true
    },
    sprint_ref: {
        type: String,
        required: true
    },
    comment: String
});


const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;