const db = require("../models");

module.exports = {
    getAll: function() { //get all users
        return db.User.find({})
          .then(dbUsers => dbUsers)
          .catch(err => res.json(err));
      },

    getOne: function(userId) { //get a user object by req.user
        return db.User.find({_id: userId}).populate({path: "projects"})
          .then(dbUser => dbUser[0])
          .catch(err => err);
    },

    getFuzzy: function(userName) { //get a fuzzy selection of users by req.params
        var regex = new RegExp(userName, "i") //creates regex equivalent to /username/i where username is a variable
        return db.User.find({username: regex}).limit(5)
            .then(result => result)
            .catch(er => err);
    },

    create: function(userBody) { //create a new user
        return db.User.create(userBody)
            .then(result => result)
            .catch(err => err);
    },

    update: function(userBody) { //update a user
        return db.User.findOneAndUpdate(
            {_id: userBody._id}, //find a user by username
            userBody, //and then update with user data
            {new: true} //return new user
        ).populate({path: "projects"})
    },

    createOrUpdate: function(user) { //adjust to createOrUpdate
        return db.User
            .find({username: user.username})
            .then(dbUser => {
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