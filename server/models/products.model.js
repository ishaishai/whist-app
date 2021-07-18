const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
});

module.exports = mongoose.model("Products", productsSchema);
