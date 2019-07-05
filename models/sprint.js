var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SprintSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: Date,
    closed_date: Date,
    status: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
        default: "OPEN",
    },
    project_ref: {
        type: String
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]
});

var Task = require('./task');
SprintSchema.post('remove', document => {
    Task.find({sprint_ref: document._id}).then(tasks => {
        tasks.map(task => task.remove());
    }).catch(err => err);
});

const Sprint = mongoose.model("Sprint", SprintSchema);
module.exports = Sprint;