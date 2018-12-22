const router = require("express").Router();
const bookRoutes = require("./books");
const bunRoutes = require("./buntest");

// Book routes
router.use("/books", bookRoutes);
router.use("/buntest", bunRoutes);

module.exports = router;
