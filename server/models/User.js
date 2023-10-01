const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    resetPassword: { type: String },
    image: String,
    address: String,
    phone: String,
    // profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
    // qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
    sex: { type: String, enum: ["male", "female", "other"] },
    // basket: [
    //   {
    //     itemId: { type: Schema.Types.ObjectId, ref: "Item" },
    //     amount: { type: Number },
    //   },
    // ],
    // orders: [{ itemId: Number, count: Number }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
