const db = require("../models");

module.exports = {
    getAll: function() { //get all users
        return db.User.find({})
          .then(dbUser => dbUser)
          .catch(err => res.json(err));
      },

    getOne: function(userName) { //get a user object by req.user
        return db.User.find({username: userName}).populate("projects")
          .then(dbUser => dbUser)
          .catch(err => err);
    },

    getFuzzy: function(userName) {
        var regex = new RegExp(userName, "i")
        return db.User.find({username: regex}).limit(5)
    },

    create: function(userBody) {
        return db.User.create(userBody);
    },

    //adjust to createOrUpdate
    createOrUpdate: function(user) {
        //console.log("Find or Create");
        return db.User
            .find({username: user.username})
            .then(dbUser => {
                if(dbUser.length > 0){
                    //console.log(dbUser[0].username+" exists");
                    return (
                        db.User.findOneAndUpdate(
                            {username: user.username},
                            user,
                            {new: true}
                        )
                    );
                } else {
                    //console.log("User does not exist");
                    return (db.User.create(user));
                }
            })
            .catch(err => err
        );
    }
}