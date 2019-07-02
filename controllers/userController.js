const db = require("../models");

module.exports = {
    getAll: function() { //get all users
        return db.User.find({})
          .then(dbUser => dbUser)
          .catch(err => res.json(err));
      },

    getOne: function(userName) { //get a user object by req.user
        return db.User.find({username: userName})
          .then(dbUser => dbUser)
          .catch(err => console.log(err));
    },

    getFuzzy: function(userName) {
        var regex = new RegExp(userName, "i")
        return db.User.find({username: regex}).limit(5)
    },

    //adjust to createOrUpdate
    createOrUpdate: function(user) {
        //console.log("Find or Create");
        return db.User
            .find({username: user.username})
            .then(dbUser => {
                if(dbUser.length > 0){
                    //console.log(dbUser[0].username+" exists");
                    return (db.User.update(user)
                        .then(result => user)
                        .catch(err => err)
                    );
                } else {
                    //console.log("User does not exist");
                    return (db.User.create(user)
                        .then(result => result)
                        .catch(err => err)
                    );
                }
            })
            .catch(err => err
        );
    }
}