const db = require("../models")

module.exports = {
  findAll: (req, res) => {
    db.Transaction.findAll({status: 'Approved', preparer: 'Bruce Banner'})
    .then(journalData => {
      console.log(journalData)
      res.json(journalData)
    })
    .catch(err => res.status(422).json(err))
  }
}