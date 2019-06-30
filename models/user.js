var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    projects: [{
        type: Schema.Types.ObjectId,
        Ref: "Project"
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;