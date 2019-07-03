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
        enum: ["Open", "In Progress", "Closed"],
        default: "Open",
    },
    project_ref: {
        type: String
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]
});

// SprintSchema.pre('remove', next => {
//     this.model("Task").remove(
//         {project_ref: this._id}
//     ).exec();
//     next();
// });

const Sprint = mongoose.model("Sprint", SprintSchema);
module.exports = Sprint;