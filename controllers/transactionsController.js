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
    console.log(req)
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
  csv: function(req, res) {
    db.Transaction
      .create(req.body)
  },
  // handles approving journals
  approve: function(req, res) {
    db.Transaction
      .updateMany({ journal_id: req.body.journalId }, { $set: { status: 'Approved', approver: req.body.user, approved_date: new Date() } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  unapprove: function(req, res) {
    db.Transaction
      .updateMany({ journal_id: req.body.journalId }, { $set: { status: 'Unapproved', approver: req.body.user, approved_date: new Date() } })
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
  getPreparer: function(req, res) {
    db.Transaction
      .aggregate(
        [
        { $group: {
            _id: {
              label: "$preparer"
            }
          }
        }]
      )
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('YEAR2' + err);res.json(err)});
  }, 
  getApprover: function(req, res) {
    db.Transaction
      .aggregate(
        [
        { $group: {
            _id: {
              label: "$approver"
            }
          }
        }]
      )
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('YEAR2' + err);res.json(err)});
  }, 
  getJournalId: function(req, res) {
    db.Transaction
      .aggregate(
        [
        { $group: {
            _id: {
              label: "$journal_id"
            }
          }
        }]
      )
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('YEAR2' + err);res.json(err)});
  },    
  searchById: function(req, res) {
    // console.log('hit!')
    db.Transaction
      .find({journal_id: req.params.id})
      .sort({ date: -1 })
      .limit(10)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  accounts: function(req, res) {
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
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('ACCOUNTS2' + err);res.json(err)});
  },  
  yearly: function(req, res) {
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
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },  
  quarterly: function(req, res) {
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
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('QTRLY AGGREGATE2' + err);res.json(err)});
  },
  monthly: function(req, res) {
    db.Transaction
    .aggregate(
      [{ $match: {status: 'Approved' }},
      { $group: {
          _id: {
            description: "$description",
            type: "$type",
            year: "$year",
            month: "$month",
          },
            amount: { $sum: "$amount" }
        }
      }]
    )
    .sort({ amount: -1 })
    .then(dbModel => {res.json(dbModel)})
    .catch(err => {console.log('REPORT 2 ' + err);res.json(err)});
  }, 
  acctyear: function(req, res) {
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
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },  
  acctquarter: function(req, res) {
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
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('QTRLY AGGREGATE2' + err);res.json(err)});
  },
  acctmonth: function(req, res) {
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
    .then(dbModel => {res.json(dbModel)})
    .catch(err => {console.log('REPORT 2 ' + err);res.json(err)});
  },
  typeyear: function(req, res) {
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
      .sort({ amount: - 1 })
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('YEARLY AGGREGATE2' + err);res.json(err)});
  },  
  typequarter: function(req, res) {
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
      .then(dbModel => {res.json(dbModel)})
      .catch(err => {console.log('QTRLY AGGREGATE2' + err);res.json(err)});
  },
  typemonth: function(req, res) {
    db.Transaction
    .aggregate(
      [{ $match: {status: 'Approved' }},
      { $group: {
          _id: {
            type: "$type",
            year: "$year",
            month: "$month",
          },
            amount: { $sum: "$amount" }
        }
      }]
    )
    .sort({ amount: -1 })
    .then(dbModel => {res.json(dbModel)})
    .catch(err => {console.log('REPORT 2 ' + err);res.json(err)});
  },
};
