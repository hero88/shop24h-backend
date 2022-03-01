const express = require("express");

const router = express.Router();

const { createCustomer, getAllCustomer, getCustomerDetail, updateCustomerByID, deleteCustomer } = require("../controllers/CustomerController");

router.post("/", createCustomer);
router.get("/", getAllCustomer);

router.get('/:customerId', getCustomerDetail);
router.put('/:customerId', updateCustomerByID);
router.delete('/:customerId', deleteCustomer);


module.exports = router;
