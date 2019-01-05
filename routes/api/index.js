const router = require("express").Router();
const transactionsRoutes = require("./transactions");
const bunRoutes = require("./buntest");
const accountsRoutes = require('./accounts')
const userRoutes = require("./user");
//routes
router.use("/transactions", transactionsRoutes);
router.use("/buntest", bunRoutes);
router.use("/accounts", accountsRoutes)
router.use("/user", userRoutes);

module.exports = router;
