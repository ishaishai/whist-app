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

var products = [
  {
    title: "Kong Classic",
    price: 10,
    description:
      "A unique shape and dynamic rubber gives KONG an unpredictable bounce",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41ickAmY24S._SL1250_.jpg",
  },
  {
    title: "Nerf Dog Spiral Squeak Football",
    price: 14,
    description:
      "Nerf-quality materials make our squeaker spiral football perfect for fetch and for teaching your dog new tricks",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81wtpTypsWL._AC_SL1500_.jpg",
  },
  {
    title: "Plush Dog Toy",
    price: 20,
    description:
      "Squeaky Interactive Puppy Dog Toys with Crinkle Paper, Durable Chew Toys for Small and Medium Dogs with Elephant Shape",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71WAFOz4qSL._AC_SL1200_.jpg",
  },
  {
    title: "MewaJump Dog Chew Toy",
    price: 15,
    description:
      "Durable Rubber Dog Toys for Aggressive Chewers, Cactus Tough Toys for Training and Cleaning Teeth, Interactive Dog Toys for Small/Medium Dog",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61sIr-iTVNL._AC_SL1200_.jpg",
  },
  {
    title: "Toozey Puppy Toy",
    price: 10,
    description:
      "7 Pack Small Dog Toys, Cute Calf Squeaky Dog Toys, Durable Puppy Teething Toys, Ropes Puppy Chew Toys, Non-Toxic and Safe",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81VLxnjuJXL._AC_SL1500_.jpg",
  },
  {
    title: "Reindeer Dog Squeaky Toy",
    price: 12,
    description:
      "Cute Plush Stuffed Puppy Chew Toy with 6 Squeakers for Small | Medium Breed",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81OQfwQjI-L._AC_SL1500_.jpg",
  },
  {
    title: "goDog Gators",
    price: 5,
    description: "Chew Guard Technology Tough Plush Dog Toy",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71n5eV1-k%2BL._AC_SL1200_.jpg",
  },
  {
    title: "Dog Squeaky Toy",
    price: 10,
    description: "Durable TPR Dog Toy with Massage Particles",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51Ct3utFyTL._AC_SL1000_.jpg",
  },
  {
    title: "Hellowag",
    price: 14,
    description:
      "Easy Teeth Cleaning Without Brushing - Best for Large and Medium Breed Dogs",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71jBQXOut1L._AC_SL1500_.jpg",
  },
  {
    title: "Youngever 4 Pack Dog Rope Toys",
    price: 20,
    description: "Puppy Chew Toys Dog Toys for Large, XL Large Dogs",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/91CC4cH4E9S._AC_SL1500_.jpg",
  },
];
// const firstDataInsert = async () => {
//   products.forEach(async(product) => {
//     const productToAdd = new productsSchema(product);
//     await productToAdd.save();
//   });
// };
//////////////////////////////

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/items", baseRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
