const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");
const db = require("../../models")


router.route("/")
  .post((req, res) => {
    let data = JSON.parse(req.body.header.data)
    let _preparer = req.body.header.name
    let index = 0

    db.Journal.create({createdBy: _preparer})
      .then(dbModel => {
        data.map(
          function(object){
            let date = new Date(object.date)
            data[index]["preparer"] = _preparer,
            data[index]["prepared_date"] = new Date(),
            data[index]["status"] = 'Pending',
            data[index]["year"] = date.getFullYear(),
            data[index]["month"] = date.getMonth() + 1,
            data[index]["quarter"] = (date.getMonth()/3) + 1
            data[index]["journal_id"] = dbModel._id
            index++
        }); 
        res.json(dbModel)
        return transactionsController.csv({body: data})
      })
  });

module.exports = router;
