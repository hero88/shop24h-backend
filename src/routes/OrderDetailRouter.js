const express = require("express");

const router = express.Router();

const {  getAllOrderDetail, getSingleOrderDetail, updateOrderDetailByID, deleteOrderDetail } = require("../controllers/OrderDetailController");

router.get("/", getAllOrderDetail);

router.get('/:orderdetailId', getSingleOrderDetail);
router.put('/:orderdetailId', updateOrderDetailByID);
router.delete('/:orderdetailId', deleteOrderDetail);


module.exports = router;
