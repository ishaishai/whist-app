const mongoose = require("mongoose");

const ProductSubSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const ordersSchema = new mongoose.Schema(
  {
    products: [ProductSubSchema],
    total: {
      type: Number,
      required: true,
    },

    // stocks: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Stocks",
    //   },
    // ],
    // crypto: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Cryptos",
    //   },
    // ],
    // savings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Savings",
    //   }
    // ]
  },
  { timestamps: { createdAt: "date" } }
);



module.exports = mongoose.model("Orders", ordersSchema);
