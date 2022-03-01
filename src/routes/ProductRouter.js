const express = require("express");

const router = express.Router();

const { createProduct, getAllProduct, getProductDetail, updateProductByID, deleteProduct } = require("../controllers/ProductController");

router.post("/", createProduct);
router.get("/", getAllProduct);

router.get('/:productId', getProductDetail);
router.put('/:productId', updateProductByID);
router.delete('/:productId', deleteProduct);


module.exports = router;
