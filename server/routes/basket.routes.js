const express = require("express");
const auth = require("../middleware/auth.middleware");
const Order = require("../models/Order");
const router = express.Router({ mergeParams: true });

// /api/basket
router.post("/", auth, async (req, res) => {
  try {
    const newOrder = await Order.create({
      orderList: req.body.itemListIds,
      userId: req.body.currentUserId,
    });
    res.send(newOrder);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
