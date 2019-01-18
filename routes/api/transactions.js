const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/transactions"
router.route("/")
  .get(transactionsController.findAll)
  .post(transactionsController.create)

// Matches with '/api/transactions/approve
router.route('/approve')
  .put(transactionsController.approve)

// Matches with '/api/transactions/unapprove
router.route('/unapprove')
  .put(transactionsController.unapprove)

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
router.route("/monthly")
  .get(transactionsController.monthly)  

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
  // .put(transactionsController.update)
  .delete(transactionsController.remove)
  
module.exports = router;
