const router = require("express").Router();
const productsSchema = require("../models/products.model");
const ordersSchema = require("../models/orders.model");
router.get("/", async (req, res) => {
  productsSchema.find({}, "-__v", (err, data) => {
    res.status(200).json({ data });
  });
});

router.post("/dispatch", async (req, res) => {
  const cart = req.body.cart;
  const newOrder = {
    products: [],
    total: 0,
  };
  cart.forEach((item) => {
    newOrder.products.push({ product: item["_id"], amount: item.count });
    newOrder.total += item.count * item.price;
  });

  const dispatchOrder = new ordersSchema(newOrder);
  dispatchOrder.save().then((res) => console.log(res));

  res.status(200).json({ msg: "OK" });
});

router.post("/edit", async (req, res) => {
  console.log(req.body);
  const id = req.body.item.id;
  const updatedItem = req.body.item.updatedItem;
  productsSchema
    .findOneAndUpdate(id, {
      price: updatedItem.price,
      title: updatedItem.title,
      description: updatedItem.description,
      image: updatedItem.image,
    })
    .then((res) => console.log(res));
});

router.delete("/delete", async (req, res) => {
  console.log(req.body);
  const id = req.body.itemId;
  productsSchema
    .deleteOne({ where: { _id: id } })
    .then((res) => res.status(200).json({ res: true }))
    .catch((error) => res.status(500).json({ res: false }));
});

router.post("/add", async (req, res) => {
  console.log(req.body);
  const item = req.body.item;
  const newProduct = new productsSchema(item);
  newProduct
    .save()
    .then((product) => {
      console.log(product);
      res.status(200).json({ product });
    })
    .catch((error) => res.status(500).json({ res: false }));
});

router.get("/stats", (req, res) => {
  const productsDict = {}; // just count
  const productsUniqueDict = {}; //every order has list turn it first into a set and than add and count
  //maybe instead try to find max 5 for both
  ordersSchema
    .find()
    .then((orders) => {
      orders.forEach((order) => {
        order.products.forEach((item) => {
          if (productsDict[item.product]) {
            productsDict[item.product] += item.amount;
            productsUniqueDict[item.product]++;
          } else {
            productsDict[item.product] = item.amount;
            productsUniqueDict[item.product] = 1;
          }
        });
      });
      let top5products = Object.fromEntries(
        Object.entries(productsDict)
          .sort((itemA, itemB) => itemB[1] - itemA[1])
          .slice(0, 4)
      );
      let top5UniqueProducts = Object.fromEntries(
        Object.entries(productsUniqueDict)
          .sort((itemA, itemB) => itemB[1] - itemA[1])
          .slice(0, 4)
      );

      let fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      ordersSchema
        .find({
          date: {
            $gt: fiveDaysAgo,
            $lte: new Date(),
          },
        })
        .then((orders) => {
          orders = orders.map((order) => {
            return {
              total: order.total,
              date: new Date(order.date).toLocaleDateString(),
            };
          });
          console.log({ top5products, top5UniqueProducts, orders });
          productsSchema
            .find(
              {
                _id: {
                  $in: Array.from(
                    new Set([
                      ...Object.keys(top5products),
                      ...Object.keys(top5UniqueProducts),
                    ])
                  ),
                },
              },
              "-price -description -image -__v"
            )
            .then((items) => {
              for (let item of items) {
                console.log(item);
                top5products[item["_id"]] = {
                  amount: top5products[item["_id"]],
                  image: item.image,
                  title: item.title,
                };
                top5UniqueProducts[item["_id"]] = {
                  amount: top5UniqueProducts[item["_id"]],
                  image: item.image,
                  title: item.title,
                };
              }
              top5products = Object.values(top5products);
              top5UniqueProducts = Object.values(top5UniqueProducts);

              res
                .status(200)
                .json({ top5products, top5UniqueProducts, orders });
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

      // console.log(Object.entries(productsDict));
    })
    .catch((error) => res.status(500).json({ res: false }));
});
module.exports = router;
