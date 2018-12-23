const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");


router.route("/")
  .post((req, res) => {
      let data = JSON.parse(req.body.header)
      console.log(data[0])
    //   transactionsController.create({body: data[0]})
    transactionsController.create({body: data})

  });

module.exports = router;
