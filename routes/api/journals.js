const router = require("express").Router();
const journalsController = require('../../controllers/journalsController')

router.route('/')
.get(journalsController.findAll)
// .post(journalsController.create)

module.exports = router;