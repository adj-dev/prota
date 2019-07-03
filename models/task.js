var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	name: {
        type: String,
        required: true
    },
	description: {
        type: String,
        required: true
    },
	created_at: {
        type: Date,
        default: Date.now
    },
	closed_at: Date,
    status: {
        type: String,
        enum: ["Open", "In Progress", "Done", "Closed"],
        default: "Open"
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
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