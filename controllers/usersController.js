const db = require("../models");

module.exports = {
  getUser: function(req, res) {
    db.User.findOne({'name': req.body.name}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  authUser: function(req, res) {
    db.User.findOne({'email':req.body.email})
      .then(dbModel => {
        if(dbModel == null){
          db.User.create(req.body)
          .then(dbModel => {
            res.json(dbModel)
          })
        }
        else{
          res.json(dbModel)
        }
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      });
  },
  updateUser: function(req, res) {
      db.User.findOneAndUpdate({'name': req.body.name}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
