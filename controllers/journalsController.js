const db = require("../models")

module.exports = {
  countPending: function (req, res) {
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
  find: function (req, res) {
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
          $match: { 'transaction.status': req.params.status }
        },
        {
          $sort: { date: -1 }
        }
        ]).limit(10)
      .then(accounts => {
        res.json(accounts)
      })
      .catch(err => res.status(422).json(err))
  },
  searchApprover: function (req, res) {
    console.log(req.params.approver)
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
          $match: { 'transaction.approver': req.params.approver }
        },
        {
          $sort: { date: -1 }
        }
        ]).limit(10)
      .then(accounts => {
        res.json(accounts)
      })
      .catch(err => res.status(422).json(err))
  },
  searchPreparer: function (req, res) {
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
          $match: { 'transaction.preparer': req.params.preparer }
        },
        {
          $sort: { date: -1 }
        }
        ]).limit(10)
      .then(accounts => {
        res.json(accounts)
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