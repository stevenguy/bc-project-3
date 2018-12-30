const router = require("express").Router();
const AccountsController = require("../../controllers/accountsController");

router.route('/')
.get(AccountsController.findAll)

module.exports = router;