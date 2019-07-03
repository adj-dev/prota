const db = require("../models");

module.exports = {
    getAll: function() { //get all users
        return db.User.find({})
          .then(dbUsers => dbUsers)
          .catch(err => res.json(err));
      },

    getOne: function(userName) { //get a user object by req.user
        return db.User.find({username: userName}).populate({path: "projects"})
          .then(dbUser => dbUser)
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

    createOrUpdate: function(user) { //adjust to createOrUpdate
        return db.User
            .find({username: user.username})
            .then(dbUser => {
                if(dbUser.length > 0){
                    //console.log(dbUser[0].username+" exists");
                    return (
                        db.User.findOneAndUpdate(
                            {username: user.username}, //find a user by username
                            user, //and then update with user data
                            {new: true} //return new user
                        )
                    );
                } else {
                    //console.log("User does not exist");
                    return db.User.create(user);
                }
            }).catch(err => err);
        //Catch is end of return db.User section
    }
}