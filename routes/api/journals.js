const router = require("express").Router();
const journalsController = require('../../controllers/journalsController')

router.route('/')
.get(journalsController.countPending)
.post(journalsController.create)

router.route('/:status')
.get(journalsController.findAll)


module.exports = router;