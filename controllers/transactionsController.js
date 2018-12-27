const db = require("../models");

// Defining methods for the TransactionsController
module.exports = {
  findAll: function(req, res) {
    db.Transaction
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Transaction
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Transaction
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Transaction
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Transaction
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  aggr: function(req, res) {
    console.log('hereeeee')
    db.Transaction
      .aggregate(
        [{ $match: { status: 'Approved' }},
        { $group: {
            _id: {
            description: "$description",
            type: "$type",
            year: "$year",
            quarter: "$quarter",
            month: "$month",
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .then(dbModel => {console.log('here' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('here2' + err);res.json(err)});
  },  
  year: function(req, res) {
    console.log('hereeeee')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
              year: "$year"
            },
              amount: { $sum: "$amount" }
          }
        }]
      )
      .then(dbModel => {console.log('here' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('here2' + err);res.json(err)});
  },  
  accounts: function(req, res) {
    console.log('hereeeee')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
              account: "$account",
              description: "$description"
            },
              amount: { $sum: "$amount" }
          }
        }]
      )
      .then(dbModel => {console.log('here' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('here2' + err);res.json(err)});
  },  
  yearly: function(req, res) {
    console.log('hereeeee')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
            description: "$description",
            type: "$type",
            year: "$year"
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .then(dbModel => {console.log('here' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('here2' + err);res.json(err)});
  },  
  quarterly: function(req, res) {
    console.log('hereeeee')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
            description: "$description",
            type: "$type",
            year: "$year",
            quarter: "$quarter"
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .then(dbModel => {console.log('here' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('here2' + err);res.json(err)});
  }
};
