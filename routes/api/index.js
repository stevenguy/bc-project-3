const router = require("express").Router();
const transactionsRoutes = require("./transactions");
const bunRoutes = require("./buntest");
const accountsRoutes = require('./accounts')
//routes
router.use("/transactions", transactionsRoutes);
router.use("/buntest", bunRoutes);
router.use("/accounts", accountsRoutes)

module.exports = router;
