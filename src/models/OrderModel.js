// Import thư viện Moogoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đối tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Order Schema MongoDB
const orderSchema = new Schema({
    _id: Schema.Types.ObjectId, // Trường _id có kiểu dữ liệu ObjectID
    orderDate: Date,
    requiredDate: Date,
    shippedDate: Date,
    note: String,
    status: {
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now
    },
    timeUpdated: {
        type: Date,
        default: Date.now
    },
    // Trường customer là một ObjectID, liên kết tới customer có _id tương ứng
    customer: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        }
    

})

//Tạo Order Model
const OrderModel = mongoose.model("Order", orderSchema);

//Export Order Model
module.exports = { OrderModel };
