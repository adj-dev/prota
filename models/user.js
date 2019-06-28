var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    projects: [{
        type: Schema.Types.ObjectId,
        Ref: "Project"
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;