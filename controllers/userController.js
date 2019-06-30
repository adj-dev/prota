const db = require("../models");

module.exports = {
    getAll: function(req, res) { //get all users
        db.User
          .find({})
          .then(dbUser => res.json(dbUser))
          .catch(err => res.json(err));
      },

    getOne: function(req, res) { //get a user object by req.user
        console.log(req.user.username);
        db.User
          .find({username: req.user.username})
          .then(dbUser => res.json(dbUser))
          .catch(err => res.json(err));
    },

    findOrCreate: function(user) {
        console.log("Find or Create");

       return db.User
            .find({username: user.username})
            .then(dbUser => {
                if(dbUser.length > 0){
                    //console.log(dbUser[0].username+" exists");
                    return dbUser;
                } else {
                    //console.log("User does not exist");
                    return (db.User.create(user)
                        .then(result => {
                            return result
                        })
                        .catch(err => err))
                }
            })
            .catch(err => err
        );
    }
}