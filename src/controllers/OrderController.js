// Import thư viện mongoose JS
const mongoose = require('mongoose');

// Import Order Model
const { OrderModel } = require('../models/OrderModel');
// Import Customer Model
const { CustomerModel } = require('../models/CustomerModel');

// Create Order
function createOrder(req, res) {
     // Khởi tạo một đối tượng OrderModel  mới truyền các tham số tương ứng từ request body vào
    const order = new OrderModel({
        // Thuộc tính _id - Random một ObjectID
        _id: mongoose.Types.ObjectId(),        
        orderDate: req.body.orderDate,
        requiredDate: req.body.requiredDate,
        shippedDate: req.body.shippedDate,
        note: req.body.note
    });

    // Gọi hàm order save - là 1 promise (Tiến trình bất đồng bộ)
    order.save()
        // Sau khi tạo order thành công
        .then(function(newOrder) {
            // Lấy customerId từ params URL (Khác với Query URL (sau ?))
            var customerId = req.params.customerId;

            // Gọi hàm OrderModel .findOneAndUpdate
            return OrderModel.findOneAndUpdate({ _id: newOrder._id }, {customer: customerId}, { new: true });                     
        })
        .then((newOrder)=>{
            var customerId = req.params.customerId;
            return CustomerModel.findOneAndUpdate({_id: customerId}, {$push: {orders: newOrder._id}}, {new: true});
        })
        // Sau khi update customer thành công trả ra status 200 - Success
        .then((data) => {
            return res.status(200).json({
                success: true,
                message: 'New Order created successfully.',
                order: data,
            });
        })
        // Xử lý lỗi trả ra 500 - Server Internal Error
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

// Get all order of customer 
function getAllOrderOfCustomer(req, res) {
    // Lấy customerId từ params URL (Khác với Query URL (sau ?))
    const customerId = req.params.customerId;

    // Gọi hàm .findById để tìm kiếm customer dựa vào ID
    CustomerModel.findById(customerId)
        // Lấy chi tiết Order dựa vào ánh xạ _id của từng phần tử trong trường orders
        .populate({path: 'orders'})
        // Nếu thành công trả ra status 200 - Success
        .then((singleCustomer) => {
            res.status(200).json({
                success: true,
                message: `More orders on ${singleCustomer.fullName}`,
                Orders: singleCustomer
            });
        })
        // Xử lý lỗi trả ra 500 - Server Internal Error
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This customer does not exist',
                error: err.message,
            });
        });
}

// Get all order
function getAllOrder(req, res) {
    OrderModel.find()
        .select('_id orderDate shippedDate requiredDate note status customer timeCreated timeUpdated')
        .then((allOrder) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all order',
                Order: allOrder,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}

// Get single order
function getSingleOrder(req, res) {
    const id = req.params.orderId;

    OrderModel.findById(id)
        .populate({path: 'customer', select: "_id fullName phoneNumber email address city country"})
        .then((singleOrder) => {
            res.status(200).json({
                success: true,
                message: `Get data on Order`,
                Order: singleOrder,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This order does not exist',
                error: err.message,
            });
        });
}

// update order
function updateOrderByID(req, res) {
    const orderId = req.params.orderId;
    const updateObject = req.body;
    OrderModel.findByIdAndUpdate(orderId, updateObject)
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Order is updated',
                updateOrder: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

// delete a order
function deleteOrder(req, res) {
    const id = req.params.orderId;

    OrderModel.findByIdAndRemove(id)
        .then(() => CustomerModel.updateMany({}, {$pull: {orders: id}}))
        .then(() => res.status(200).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
            message: err.message,
        }));
}

module.exports = { createOrder, getAllOrderOfCustomer, getAllOrder, updateOrderByID, getSingleOrder, deleteOrder }
