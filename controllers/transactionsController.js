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
  compareyear: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $project: {
          _id: 0,
          description: "$description",
          type: "$type",
          year: "$year",
          quarter: "$quarter",
          1: {$cond: [{$eq: ['$quarter', 1]}, '$amount', 0]},
          2: {$cond: [{$eq: ['$quarter', 2]}, '$amount', 0]},
          3: {$cond: [{$eq: ['$quarter', 3]}, '$amount', 0]},
          4: {$cond: [{$eq: ['$quarter', 4]}, '$amount', 0]},
        }},
        { $group: {
          _id: {
            description: "$description",
            type: "$type",
            year: "$year",
          },
          Q1: { $sum: "$1" },
          Q2: { $sum: "$2" },
          Q3: { $sum: "$3" },
          Q4: { $sum: "$4" }
        }
        }]
      )
      .sort({ amount: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },
  comparequarter: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $project: {
          _id: 0,
          description: "$description",
          type: "$type",
          year: "$year",
          quarter: "$quarter",
          1: {$cond: [{$eq: ['$quarter', 1]}, '$amount', 0]},
          2: {$cond: [{$eq: ['$quarter', 2]}, '$amount', 0]},
          3: {$cond: [{$eq: ['$quarter', 3]}, '$amount', 0]},
          4: {$cond: [{$eq: ['$quarter', 4]}, '$amount', 0]},
        }},
        { $group: {
          _id: {
            description: "$description",
            type: "$type",
            year: "$year",
          },
          Q1: { $sum: "$1" },
          Q2: { $sum: "$2" },
          Q3: { $sum: "$3" },
          Q4: { $sum: "$4" }
        }
        }]
      )
      .sort({ Q1: -1 })
      .sort({ Q2: -1 })
      .sort({ Q3: -1 })
      .sort({ Q4: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },
  comparemonth: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $project: {
          _id: 0,
          description: "$description",
          type: "$type",
          year: "$year",
          1: {$cond: [{$eq: ['$month', 1]}, '$amount', 0]},
          2: {$cond: [{$eq: ['$month', 2]}, '$amount', 0]},
          3: {$cond: [{$eq: ['$month', 3]}, '$amount', 0]},
          4: {$cond: [{$eq: ['$month', 4]}, '$amount', 0]},
          5: {$cond: [{$eq: ['$month', 5]}, '$amount', 0]},
          6: {$cond: [{$eq: ['$month', 6]}, '$amount', 0]},
          7: {$cond: [{$eq: ['$month', 7]}, '$amount', 0]},
          8: {$cond: [{$eq: ['$month', 7]}, '$amount', 0]},
          9: {$cond: [{$eq: ['$month', 9]}, '$amount', 0]},
          10: {$cond: [{$eq: ['$month', 10]}, '$amount', 0]},
          11: {$cond: [{$eq: ['$month', 11]}, '$amount', 0]},
          12: {$cond: [{$eq: ['$month', 12]}, '$amount', 0]},
        }},
        { $group: {
          _id: {
            description: "$description",
            type: "$type",
            year: "$year",
          },
          M1: { $sum: "$1" },
          M2: { $sum: "$2" },
          M3: { $sum: "$3" },
          M4: { $sum: "$4" },
          M5: { $sum: "$5" },
          M6: { $sum: "$6" },
          M7: { $sum: "$7" },
          M8: { $sum: "$8" },
          M9: { $sum: "$9" },
          M10: { $sum: "$10" },
          M11: { $sum: "$11" },
          M12: { $sum: "$12" }
        }
        }]
      )
      .sort({ M1: -1 })
      .sort({ M2: -1 })
      .sort({ M3: -1 })
      .sort({ M4: -1 })
      .sort({ M5: -1 })
      .sort({ M6: -1 })
      .sort({ M7: -1 })
      .sort({ M8: -1 })
      .sort({ M9: -1 })
      .sort({ M10: -1 })
      .sort({ M11: -1 })
      .sort({ M12: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },
  compareyrsum: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $project: {
          _id: 0,
          description: "$description",
          type: "$type",
          year: "$year",
          quarter: "$quarter",
          1: {$cond: [{$eq: ['$quarter', 1]}, '$amount', 0]},
          2: {$cond: [{$eq: ['$quarter', 2]}, '$amount', 0]},
          3: {$cond: [{$eq: ['$quarter', 3]}, '$amount', 0]},
          4: {$cond: [{$eq: ['$quarter', 4]}, '$amount', 0]},
        }},
        { $group: {
          _id: {
            description: "$description",
            type: "$type",
            year: "$year",
          },
          Q1: { $sum: "$1" },
          Q2: { $sum: "$2" },
          Q3: { $sum: "$3" },
          Q4: { $sum: "$4" }
        }
        }]
      )
      .sort({ amount: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },
  compareqtrsum: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $project: {
          _id: 0,
          type: "$type",
          year: "$year",
          1: {$cond: [{$eq: ['$quarter', 1]}, '$amount', 0]},
          2: {$cond: [{$eq: ['$quarter', 2]}, '$amount', 0]},
          3: {$cond: [{$eq: ['$quarter', 3]}, '$amount', 0]},
          4: {$cond: [{$eq: ['$quarter', 4]}, '$amount', 0]},
        }},
        { $group: {
          _id: {
            type: "$type",
            year: "$year",
          },
          Q1: { $sum: "$1" },
          Q2: { $sum: "$2" },
          Q3: { $sum: "$3" },
          Q4: { $sum: "$4" }
        }
        }]
      )
      .sort({ Q1: -1 })
      .sort({ Q2: -1 })
      .sort({ Q3: -1 })
      .sort({ Q4: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },
  comparemthsum: function(req, res) {
    console.log('YEARLY AGGREGATE')
    db.Transaction
      .aggregate(
        [{ $match: {status: 'Approved' }},
        { $project: {
          _id: 0,
          type: "$type",
          year: "$year",
          1: {$cond: [{$eq: ['$month', 1]}, '$amount', 0]},
          2: {$cond: [{$eq: ['$month', 2]}, '$amount', 0]},
          3: {$cond: [{$eq: ['$month', 3]}, '$amount', 0]},
          4: {$cond: [{$eq: ['$month', 4]}, '$amount', 0]},
          5: {$cond: [{$eq: ['$month', 5]}, '$amount', 0]},
          6: {$cond: [{$eq: ['$month', 6]}, '$amount', 0]},
          7: {$cond: [{$eq: ['$month', 7]}, '$amount', 0]},
          8: {$cond: [{$eq: ['$month', 7]}, '$amount', 0]},
          9: {$cond: [{$eq: ['$month', 9]}, '$amount', 0]},
          10: {$cond: [{$eq: ['$month', 10]}, '$amount', 0]},
          11: {$cond: [{$eq: ['$month', 11]}, '$amount', 0]},
          12: {$cond: [{$eq: ['$month', 12]}, '$amount', 0]},
        }},
        { $group: {
          _id: {
            type: "$type",
            year: "$year",
          },
          M1: { $sum: "$1" },
          M2: { $sum: "$2" },
          M3: { $sum: "$3" },
          M4: { $sum: "$4" },
          M5: { $sum: "$5" },
          M6: { $sum: "$6" },
          M7: { $sum: "$7" },
          M8: { $sum: "$8" },
          M9: { $sum: "$9" },
          M10: { $sum: "$10" },
          M11: { $sum: "$11" },
          M12: { $sum: "$12" }
        }
        }]
      )
      .sort({ M1: -1 })
      .sort({ M2: -1 })
      .sort({ M3: -1 })
      .sort({ M4: -1 })
      .sort({ M5: -1 })
      .sort({ M6: -1 })
      .sort({ M7: -1 })
      .sort({ M8: -1 })
      .sort({ M9: -1 })
      .sort({ M10: -1 })
      .sort({ M11: -1 })
      .sort({ M12: -1 })
      .then(dbModel => {console.log('YEARLY AGGREGATE' + JSON.stringify(dbModel[1])); res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  }
};
