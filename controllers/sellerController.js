const User = require("../models/User");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createCatalog = async (req, res) => {
  try {
    const sellerId = req.user._id; // Assuming you have middleware to authenticate and set the user in req.user
    const { products } = req.body;

    const catalog = new Catalog({ seller: sellerId, products: [] });

    for (const productData of products) {
      const product = new Product({
        name: productData.name,
        price: productData.price,
      });
      await product.save();
      catalog.products.push(product._id);
    }

    await catalog.save();
    res.json({ message: "Catalog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating catalog" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const sellerId = req.user._id; // Assuming you have middleware to authenticate and set the user in req.user

    const orders = await Order.find({
      products: {
        $in: await Catalog.findOne({ seller: sellerId }).distinct("products"),
      },
    }).populate("products");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
