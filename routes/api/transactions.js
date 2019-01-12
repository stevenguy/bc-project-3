const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/transactions"
router.route("/")
  .get(transactionsController.findAll)
  .post(transactionsController.create)

// Finds Transaction by Preparer's name
router.route("/preparer/:name")
  .get(transactionsController.transByPreparer)

// Finds Transaction by Approver's name
router.route("/approver/:name")
  .get(transactionsController.transByApprover)

// Aggregate Preparer Data for Autofill Feature
router.route("/preparer")
  .get(transactionsController.getPreparer)

// Aggregate Approver Data for Autofill Feature
router.route("/approver")
  .get(transactionsController.getApprover)

// Aggregate MongoId Data for Autofill feature
router.route("/journal")
  .get(transactionsController.getJournalId)

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

// Aggregate Data by Type, Year, and Amount  
router.route("/compareyear")
  .get(transactionsController.compareyear)  

// Aggregate Data by Type, Year, and Amount  
router.route("/comparequarter")
  .get(transactionsController.comparequarter) 

// Aggregate Data by Type, Year, and Amount  
router.route("/comparemonth")
  .get(transactionsController.comparemonth)  

// Aggregate Data by Type, Year, and Amount  
router.route("/compareyrsum")
  .get(transactionsController.compareyrsum)  

// Aggregate Data by Type, Year, and Amount  
router.route("/compareqtrsum")
  .get(transactionsController.compareqtrsum) 

// Aggregate Data by Type, Year, and Amount  
router.route("/comparemthsum")
  .get(transactionsController.comparemthsum)
  
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
  .delete(transactionsController.remove)
  
module.exports = router;