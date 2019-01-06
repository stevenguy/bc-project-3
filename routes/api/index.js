const router = require("express").Router();
const transactionsRoutes = require("./transactions");
const bunRoutes = require("./buntest");
const accountsRoutes = require('./accounts')
const journalsRoutes = require('./journals')
//routes
router.use("/transactions", transactionsRoutes);
router.use("/buntest", bunRoutes);
router.use("/accounts", accountsRoutes)
router.use("/journals", journalsRoutes)

module.exports = router;
