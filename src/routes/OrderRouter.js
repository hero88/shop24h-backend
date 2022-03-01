const express = require("express");

const router = express.Router();

const { createOrder, getAllOrder, getSingleOrder, updateOrderByID, deleteOrder } = require("../controllers/OrderController");

router.post("/:customerId", createOrder);
router.get("/", getAllOrder);

router.get('/:orderId', getSingleOrder);
router.put('/:orderId', updateOrderByID);
router.delete('/:orderId', deleteOrder);


module.exports = router;
