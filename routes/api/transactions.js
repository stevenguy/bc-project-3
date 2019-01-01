const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/transactions"
router.route("/")
  .get(transactionsController.findAll)
  .post(transactionsController.create)

// Aggregate Data by Description, Type, Year, Quarter, Month, and Amount  
router.route("/reports")
  .get(transactionsController.reports)  

// Aggregate Data by Description, Type, Year, and Amount
router.route("/yearly")
  .get(transactionsController.yearly)

// Aggregate Data by Description, Type, Year, Quarter, and Amount
router.route("/quarterly")
  .get(transactionsController.quarterly)  

// Aggregate Account Detail Data by Transaction, Memo, Description, Type, Year, Quarter, Month, and Amount  
router.route("/acctmonth")
  .get(transactionsController.acctmonth)  

// Aggregate Account Detail Data by Transaction, Memo, Description, Type, Year, Quarter, and Amount  
router.route("/acctquarter")
  .get(transactionsController.acctquarter)  

// Aggregate Account Detail Data by Transaction, Memo, Description, Type, Year, and Amount  
router.route("/acctyear")
  .get(transactionsController.acctyear)

// Aggregate Data by Type, Year, Quarter, Month, and Amount  
router.route("/typemonth")
  .get(transactionsController.typemonth)

// Aggregate Data by Type, Year, Quarter, and Amount  
router.route("/typequarter")
  .get(transactionsController.typequarter)  

// Aggregate Data by Type, Year, and Amount  
router.route("/typeyear")
  .get(transactionsController.typeyear)

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