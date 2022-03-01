// Import thư viện mongoose JS
const mongoose = require('mongoose');

// Import OrderDetail Model
const { OrderDetailModel } = require('../models/OrderDetailModel');

// Create OrderDetail
function createOrderDetail(req, res) {
     // Khởi tạo một đối tượng OrderDetailModel  mới truyền các tham số tương ứng từ request body vào
    const orderdetail = new OrderDetailModel({
        // Thuộc tính _id - Random một ObjectID
        _id: mongoose.Types.ObjectId(),        
        quantity: req.body.quantity,
        priceEach: req.body.priceEach
    });

    // Gọi hàm orderdetail save - là 1 promise (Tiến trình bất đồng bộ)
    orderdetail.save()
        // Sau khi tạo orderdetail thành công
        .then(function(newOrderDetail) {
            // Lấy customerId từ params URL (Khác với Query URL (sau ?))
            var orderId = req.params.orderId;
            var productId = req.params.productId;

            // Gọi hàm OrderDetailModel .findOneAndUpdate
            return OrderDetailModel.findOneAndUpdate({ _id: newOrderDetail._id }, {order: orderId}, {product: productId}, { new: true });
        })
        // Sau khi update customer thành công trả ra status 200 - Success
        .then((data) => {
            return res.status(200).json({
                success: true,
                message: 'New OrderDetail created successfully.',
                orderdetail: data,
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

// Get all orderdetail
function getAllOrderDetail(req, res) {
    OrderDetailModel.find()
        .select('_id order product quantity priceEach')
        .then((allOrderDetail) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all orderdetail',
                OrderDetail: allOrderDetail,
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

// Get single orderdetail
function getSingleOrderDetail(req, res) {
    const id = req.params.orderdetailId;

    OrderDetailModel.findById(id)
        .populate({path: 'order'})
        .populate({path: 'product'})
        .then((singleOrderDetail) => {
            res.status(200).json({
                success: true,
                message: `Get data on OrderDetail`,
                OrderDetail: singleOrderDetail,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This orderdetail does not exist',
                error: err.message,
            });
        });
}

// update orderdetail
function updateOrderDetailByID(req, res) {
    const orderdetailId = req.params.orderdetailId;
    const updateObject = req.body;
    OrderDetailModel.findByIdAndUpdate(orderdetailId, updateObject)
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'OrderDetail is updated',
                updateOrderDetail: updateObject,
            });
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}

// delete a orderdetail
function deleteOrderDetail(req, res) {
    const id = req.params.orderdetailId;

    OrderDetailModel.findByIdAndRemove(id)
        .then(() => res.status(200).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
        }));
}

module.exports = { createOrderDetail, getAllOrderDetail, updateOrderDetailByID, getSingleOrderDetail, deleteOrderDetail }
