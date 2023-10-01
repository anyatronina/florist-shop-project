const express = require("express");
const router = express.Router({ mergeParams: true });

// /api/auth
router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/user", require("./user.routes"));
router.use("/item", require("./item.routes"));
router.use("/basket", require("./basket.routes"));
router.use("/order", require("./order.routes"));

module.exports = router;
