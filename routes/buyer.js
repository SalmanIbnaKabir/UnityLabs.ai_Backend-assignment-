const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const auth = require("../middleware/authMiddleware");

router.get("/list-of-sellers", buyerController.getListOfSellers);
router.get("/seller-catalog/:seller_id", buyerController.getSellerCatalog);
router.post("/create-order/:seller_id", auth, buyerController.createOrder);

module.exports = router;
