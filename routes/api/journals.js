const router = require("express").Router();
const journalsController = require('../../controllers/journalsController')

router.route('/')
.get(journalsController.countPending)
.post(journalsController.create)

// router.route('/:status')
// .get(journalsController.findAll)


router.route('/status/:status')
.get(journalsController.find)

module.exports = router;