const express = require("express");

const router = express.Router();

const { getAllOrder, getSingleOrder, updateOrderByID, deleteOrder } = require("../controllers/OrderController");
const { createOrderDetail } = require('../controllers/OrderDetailController');

router.get("/", getAllOrder);

router.get('/:orderId', getSingleOrder);
router.put('/:orderId', updateOrderByID);
router.delete('/:orderId', deleteOrder);

router.post('/:orderId/product/:productId/detail', createOrderDetail);


module.exports = router;
