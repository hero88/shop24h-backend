const mongoose = require("mongoose");

const { CustomerModel } = require("../models/CustomerModel");

function createCustomer (request, response) {
    const customer = new CustomerModel({
        _id: mongoose.Types.ObjectId(),
        fullName: request.body.fullName,
        phoneNumber: request.body.phoneNumber,
        email: request.body.email,
        address: request.body.address,
        city: request.body.city,
        country: request.body.country
    });

    customer.save()
        .then((newCustomer) => {
            return response.status(200).json({
                message: "Success",
                customer: newCustomer
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })
}

function getAllCustomer (request, response) {
    CustomerModel.find()
        .select("_id fullName phoneNumber email address city country timeCreated timeUpdated")
        .then((customerList) => {
            return response.status(200).json({
                message: "Success",
                customers: customerList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: "Fail",
                error: error.message
            })
        })
}
function getCustomerDetail(request, response) {
    // Lấy customerId từ params URL
    const customerId = request.params.customerId;

    // Kiểm tra xem customerId có phải ObjectID hay không 
    if (mongoose.Types.ObjectId.isValid(customerId)) {
        CustomerModel.findById(customerId)
            .then((data) => {
                if (data) {
                    return response.status(200).json({
                        message: "Success",
                        customer: data
                    })
                } else {
                    return response.status(404).json({
                        message: "Fail",
                        error: "Not found"
                    })
                }
            })
            .catch((error) => {
                return response.status(500).json({
                    message: "Fail",
                    error: error.message
                })
            })
    } else {
        // Nếu không phải ObjectID thì trả ra lỗi 400 - Bad request
        return response.status(400).json({
            message: "Fail",
            error: "CustomerID is not valid"
        })
    }
}

function updateCustomerByID(request, response) {
    // Lấy customerId từ params URL
    const customerId = request.params.customerId;

    const updateObject = request.body;

    // Kiểm tra xem customerId có phải ObjectID hay không 
    if (mongoose.Types.ObjectId.isValid(customerId)) {
        CustomerModel.findByIdAndUpdate(customerId, updateObject)
            .then(() => {
                return response.status(200).json({
                    message: "Success",
                    updatedObject: updateObject
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: "Fail",
                    error: error.message
                })
            })
    } else {
        // Nếu không phải ObjectID thì trả ra lỗi 400 - Bad request
        return response.status(400).json({
            message: "Fail",
            error: "CustomerID is not valid"
        })
    }
}

function deleteCustomer(request, response) {
    // Lấy customerId từ params URL
    const customerId = request.params.customerId;

    // Kiểm tra xem customerId có phải ObjectID hay không 
    if (mongoose.Types.ObjectId.isValid(customerId)) {
        CustomerModel.findByIdAndDelete(customerId)
            .then(() => {
                return response.status(200).json({
                    message: "Success"
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: "Fail",
                    error: error.message
                })
            })
    } else {
        // Nếu không phải ObjectID thì trả ra lỗi 400 - Bad request
        return response.status(400).json({
            message: "Fail",
            error: "CustomerID is not valid"
        })
    }
}

module.exports = { createCustomer, getAllCustomer, getCustomerDetail, updateCustomerByID, deleteCustomer }
