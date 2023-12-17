const User = require("../models/User");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getListOfSellers = async (req, res) => {
  try {
    const sellers = await User.find({ userType: "seller" }).select("-password");
    res.json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching sellers" });
  }
};

exports.getSellerCatalog = async (req, res) => {
  try {
    const sellerId = req.params.seller_id;
    const catalog = await Catalog.findOne({ seller: sellerId }).populate(
      "products"
    );
    if (!catalog) {
      return res.status(404).json({ error: "Seller catalog not found" });
    }
    res.json(catalog.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching seller catalog" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const buyerId = req.user._id; // Assuming you have middleware to authenticate and set the user in req.user
    const sellerId = req.params.seller_id;
    const { products } = req.body;

    const sellerCatalog = await Catalog.findOne({ seller: sellerId });
    if (!sellerCatalog) {
      return res.status(404).json({ error: "Seller catalog not found" });
    }

    const orderProducts = [];
    for (const productData of products) {
      const product = new Product({
        name: productData.name,
        price: productData.price,
      });
      await product.save();
      orderProducts.push(product._id);
    }

    const order = new Order({ buyer: buyerId, products: orderProducts });
    await order.save();

    res.json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating order" });
  }
};
