const db = require("../models");

module.exports = {
  getAll: function() {
    //get all users
    return db.User.find({})
      .then(dbUsers => dbUsers)
      .catch(err => res.json(err));
  },

  getOne: function(userId) {
    //get a user object by req.user
    return db.User.find({ _id: userId })
      .populate({ path: "projects" })
      .then(dbUser => dbUser[0])
      .catch(err => err);
  },

  getFuzzy: function(userName) {
    //get a fuzzy selection of users by req.params
    var regex = new RegExp(userName, "i"); //creates regex equivalent to /username/i where username is a variable
    return db.User.find({ username: regex })
      .limit(5)
      .then(result => result)
      .catch(err => err);
  },

    invite: function(userName) { //Create a new user if does not exist
        return db.User
            .find({username: userName})
            .then(dbUser => { //returns an array of user objects
                if(dbUser.length > 0){
                    //console.log(dbUser[0].username+" exists");
                    return "User Exists";
                } else {
                    //console.log("User does not exist");
                    return this.create({username: userName});
                }
            }).catch(err => err);
        //Catch is end of return db.User section
    },

    create: function(userBody) { //create a new user
        return db.User.create(userBody)
            .then(result => result)
            .catch(err => err);
    },

    update: function(userBody) { //update a user
        return db.User.findOneAndUpdate(
            {username: userBody.username}, //find a user by userId
            userBody, //and then update with user data
            {new: true, useFindAndModify: false} //return new user
        ).populate({path: "projects"})
    },

    createOrUpdate: function(user) { //If new user, create, else update user
        return db.User
            .find({username: user.username})
            .then(dbUser => { //returns an array of user objects
                if(dbUser.length > 0){
                    //console.log(dbUser[0].username+" exists");
                    return this.update(user);
                } else {
                    //console.log("User does not exist");
                    return this.create(user);
                }
            }).catch(err => err);
        //Catch is end of return db.User section
    }
}
