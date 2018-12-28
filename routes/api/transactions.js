const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/transactions"
router.route("/")
  .get(transactionsController.findAll)
  .post(transactionsController.create)
  .get(transactionsController.reports)

// Aggregate Data by Description, Type, Year, Quarter, Month, and Amount
router.route("/aggr")
  .get(transactionsController.aggr)

// Aggregate Data by Description, Type, Year, and Amount
router.route("/yearly")
  .get(transactionsController.yearly)

// Aggregate Data by Description, Type, Year, and Amount
router.route("/quarterly")
  .get(transactionsController.quarterly)  

// Aggregate Year
router.route("/year")
  .get(transactionsController.year)  

// Aggregate Account
router.route("/accounts")
  .get(transactionsController.accounts)    
  
// Matches with "/api/transactions/:id"
router.route("/:id")
  .get(transactionsController.findById)
  .put(transactionsController.update)
  .delete(transactionsController.remove);

module.exports = router;