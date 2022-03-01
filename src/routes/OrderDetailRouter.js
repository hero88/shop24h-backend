const express = require("express");

const router = express.Router();

const { createOrderDetail, getAllOrderDetail, getSingleOrderDetail, updateOrderDetailByID, deleteOrderDetail } = require("../controllers/OrderDetailController");

router.post("/:orderId&:productId", createOrderDetail);
router.get("/", getAllOrderDetail);

router.get('/:orderdetailId', getSingleOrderDetail);
router.put('/:orderdetailId', updateOrderDetailByID);
router.delete('/:orderdetailId', deleteOrderDetail);


module.exports = router;
