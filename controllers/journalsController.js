const db = require("../models")

module.exports = {
  findAll: function (req, res) {
    db.Journal
      .aggregate(
        [{
          $lookup:
          {
            from: 'transactions',
            localField: '_id',
            foreignField: 'journal_id',
            as: 'transaction'
          }
        },
        {
          $match: { 'transaction.status': 'Pending' }
        }
        ])
      .then(accounts => {
        res.json(accounts.length)
      })
      .catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
      db.Journal
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }