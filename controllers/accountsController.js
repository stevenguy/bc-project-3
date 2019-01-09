const db = require("../models");

module.exports = {
    findAll: function(req, res) {
      db.Account
        .find({})
        .then(accounts => {
            res.json(accounts)
        })
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Account
            .create(req.body)
            .then((dbModel) => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}