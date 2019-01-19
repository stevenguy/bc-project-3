const router = require("express").Router();
const journalsController = require('../../controllers/journalsController')

router.route('/')
.get(journalsController.countPending)
.post(journalsController.create)

router.route('/status/:status')
.get(journalsController.find)

router.route('/approver/:approver')
.get(journalsController.searchApprover)

router.route('/preparer/:preparer')
.get(journalsController.searchPreparer)

module.exports = router;