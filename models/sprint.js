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
        required: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task"
    }]
});

const Sprint = mongoose.model("Sprint", SprintSchema);
module.exports = Sprint;