const router = require("express").Router();
const JournalController = require("../../controllers/journalsController");

router.route('/')
.get(JournalController.findAll)
.post(JournalController.create)

module.exports = router;