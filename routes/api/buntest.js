const router = require("express").Router();
// const booksController = require("../../controllers/bunController");

// Matches with "/api/books"
router.route("/")
  .post((req, res) => {
      let data = JSON.parse(req.body.header)
      console.log(data)
      //console.log((req.body).replace(' : ""', ''))
  });

module.exports = router;
