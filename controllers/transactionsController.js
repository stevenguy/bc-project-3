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
    console.log(req.body[0])
    db.Transaction
      .create(req.body[0])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  csv: function(req, res) {
    console.log(req.body)
    db.Transaction
      .insertMany(req.body)
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
  year: function(req, res) {
    console.log('YEAR')
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
      .then(dbModel => {console.log('YEAR' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEAR2' + err);res.json(err)});
  },  
  accounts: function(req, res) {
    console.log('ACCOUNTS')
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
      .then(dbModel => {console.log('ACCOUNTS' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('ACCOUNTS2' + err);res.json(err)});
  },  
  yearly: function(req, res) {
    console.log('YEARLY AGGREGATE')
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
      .sort({ amount: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },  
  quarterly: function(req, res) {
    console.log('QTRLY AGGREGATE')
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
      .sort({ amount: -1 })
      .then(dbModel => {console.log('QTRLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('QTRLY AGGREGATE2' + err);res.json(err)});
  },
  reports: function(req, res) {
    console.log('REPORT DATA')
    console.log(req.query)
    console.log(req.params)
    db.Transaction
    .aggregate(
      [{ $match: {status: 'Approved' }},
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
    .sort({ amount: -1 })
    .then(dbModel => {console.log('REPORT' + JSON.stringify(dbModel[1])); res.json(dbModel)})
    .catch(err => {console.log('REPORT 2 ' + err);res.json(err)});
  }, 
  acctyear: function(req, res) {
    console.log('YEARLY ACCT DETAIL AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
              journal_id: "$journal_id",
              date: "$date",
              account: "$account",
              description: "$description",
              type: "$type",
              transaction: "$transaction",
              memo: "$memo",
              detail: "$details",
              preparer: "$preparer",
              prepared_date: "$prepared_date",
              approver: "$approver",
              approved_date: "$approved_date",
              year: "$year"
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .sort({ date: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },  
  acctquarter: function(req, res) {
    console.log('QTRLY ACCT DETAIL AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
              journal_id: "$journal_id",
              date: "$date",
              account: "$account",
              description: "$description",
              type: "$type",
              transaction: "$transaction",
              memo: "$memo",
              detail: "$details",
              preparer: "$preparer",
              prepared_date: "$prepared_date",
              approver: "$approver",
              approved_date: "$approved_date",
              year: "$year",
              quarter: "$quarter"
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .sort({ date: -1 })
      .then(dbModel => {console.log('QTRLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('QTRLY AGGREGATE2' + err);res.json(err)});
  },
  acctmonth: function(req, res) {
    console.log('MTHLY ACCT DETAIL AGGREGATE')
    console.log(req.query)
    console.log(req.params)
    db.Transaction
    .aggregate(
      [{ $match: {status: 'Approved' }},
      { $group: {
          _id: {
            journal_id: "$journal_id",
            date: "$date",
            account: "$account",
            description: "$description",
            type: "$type",
            transaction: "$transaction",
            memo: "$memo",
            detail: "$details",
            preparer: "$preparer",
            prepared_date: "$prepared_date",
            approver: "$approver",
            approved_date: "$approved_date",
            year: "$year",
            quarter: "$quarter",
            month: "$month",
          },
            amount: { $sum: "$amount" }
        }
      }]
    )
    .sort({ date: -1 })
    .then(dbModel => {console.log('REPORT' + JSON.stringify(dbModel[1])); res.json(dbModel)})
    .catch(err => {console.log('REPORT 2 ' + err);res.json(err)});
  },
  typeyear: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
            type: "$type",
            year: "$year"
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .sort({ amount: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },  
  typequarter: function(req, res) {
    console.log('QTRLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $group: {
            _id: {
            type: "$type",
            year: "$year",
            quarter: "$quarter"
            },
            amount: { $sum: "$amount" }
          }
        }]
      )
      .sort({ amount: -1 })
      .then(dbModel => {console.log('QTRLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('QTRLY AGGREGATE2' + err);res.json(err)});
  },
  typemonth: function(req, res) {
    console.log('REPORT DATA')
    console.log(req.query)
    console.log(req.params)
    db.Transaction
    .aggregate(
      [{ $match: {status: 'Approved' }},
      { $group: {
          _id: {
            type: "$type",
            year: "$year",
            quarter: "$quarter",
            month: "$month",
          },
            amount: { $sum: "$amount" }
        }
      }]
    )
    .sort({ amount: -1 })
    .then(dbModel => {console.log('REPORT' + JSON.stringify(dbModel[1])); res.json(dbModel)})
    .catch(err => {console.log('REPORT 2 ' + err);res.json(err)});
  },
};
