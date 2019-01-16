const router = require("express").Router();
const journalsController = require('../../controllers/journalsController')

router.route('/')
.get(journalsController.countPending)
.post(journalsController.create)


module.exports = router;