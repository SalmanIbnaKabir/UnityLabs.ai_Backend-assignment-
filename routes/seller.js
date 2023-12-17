const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const auth = require("../middleware/authMiddleware");

router.post("/create-catalog", auth, sellerController.createCatalog);
router.get("/orders", auth, sellerController.getOrders);

module.exports = router;
