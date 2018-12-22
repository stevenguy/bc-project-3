const router = require("express").Router();
const transactionsRoutes = require("./transactions");

// Book routes
router.use("/transactions", transactionsRoutes);

module.exports = router;
