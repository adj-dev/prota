var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { //Github.username
        type: String,
        required: true
    },
    email: {
        type: String,
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    avatar_url: { //Github.photos[0].value
        type: String,
        //required: true
    },
    display_name: { //Github.displayName
        type: String,
        //required: true
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;