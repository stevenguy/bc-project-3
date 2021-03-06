const db = require("../models");

module.exports = {
  getUser: function (req, res) {
    db.User.find() //make is search for users with unassigned roles
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  authUser: function (req, res) {
    db.User.findOne({ 'email': req.body.email })
      .then(dbModel => {
        if (dbModel == null) {
          db.User.create(req.body)
            .then(dbModel => {
              res.json(dbModel)
            })
        }
        else {
          res.json(dbModel)
        }
      })
      .catch(err => {
        res.status(422).json(err)
      });
  },
  updateUser: function (req, res) {
    db.User.findOneAndUpdate({ '_id': req.body._id}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  authPassword: function (req, res) {
    db.User.findOne({'email' : req.body.email, 'password' : req.body.password})
    .then(dbModel => {
      if(dbModel){
        res.json(dbModel);
      }else{
        res.json(false);
      }
    })
    .catch(err => {
      res.status(422).json(err)
    })
  }
};
