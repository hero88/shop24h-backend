const express = require("express");

const router = express.Router();

const { getAllOrder, getSingleOrder, updateOrderByID, deleteOrder } = require("../controllers/OrderController");


router.get("/", getAllOrder);

router.get('/:orderId', getSingleOrder);
router.put('/:orderId', updateOrderByID);
router.delete('/:orderId', deleteOrder);


module.exports = router;
