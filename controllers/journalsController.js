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
          $match: { 'transaction.status': 'Approved' }
        }
        ]).limit(10)
      .then(accounts => {
        res.json(accounts)
      })
      .catch(err => res.status(422).json(err))
    }
  }
    // findAll: function (req, res) {
    //   console.log('Here')
    //   db.Transaction
    //     .find({ status: 'Approved'}).limit(10)
    //     .then(accounts => {
    //       res.json(accounts)
    //     })
    //     .catch(err => res.status(422).json(err));
    // },
    // create: function (req, res) {
    //   console.log(req.body)
    //   db.Journal
    //     .create(req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }

