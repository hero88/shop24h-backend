const express = require("express");

const router = express.Router();

const { createCustomer, getAllCustomer, getCustomerDetail, updateCustomerByID, deleteCustomer } = require("../controllers/CustomerController");
const { createOrder, getAllOrderOfCustomer } = require("../controllers/OrderController");

router.post("/", createCustomer);
router.get("/", getAllCustomer);

router.get('/:customerId', getCustomerDetail);
router.put('/:customerId', updateCustomerByID);
router.delete('/:customerId', deleteCustomer);

router.post('/:customerId/orders', createOrder);
router.get('/:customerId/orders', getAllOrderOfCustomer);

module.exports = router;
