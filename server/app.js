const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 
const app = express();
const baseRoutes = require("./routes/base.routes");
const mongoose = require("mongoose");
// require("dotenv").config();
const productsSchema = require("./models/products.model");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://ishai:123ishai@thoughtswall-cluster.g7fax.mongodb.net/whist-app?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const dbInstance = mongoose.connection;

dbInstance.on("error", (error) => console.error(error));
dbInstance.once("open", () => {
  console.log("Connected to database");
 
});


app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/items", baseRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
