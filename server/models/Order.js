const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    orderList: [
      { itemId: { type: Schema.Types.ObjectId, ref: "Item" }, amount: String },
    ],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", schema);
