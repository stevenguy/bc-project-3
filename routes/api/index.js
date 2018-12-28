const router = require("express").Router();
const transactionsRoutes = require("./transactions");
const bunRoutes = require("./buntest");
// Book routes
router.use("/transactions", transactionsRoutes);
router.use("/buntest", bunRoutes);

module.exports = router;
